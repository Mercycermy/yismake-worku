const QRCode = require("qrcode");
const zlib = require("zlib");

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ZIP_UTF8_FLAG = 0x0800;
const ZIP_STORE_METHOD = 0;

const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < CRC_TABLE.length; n++) {
    let value = n;
    for (let bit = 0; bit < 8; bit++) {
        value = (value & 1)
            ? (0xedb88320 ^ (value >>> 1))
            : (value >>> 1);
    }
    CRC_TABLE[n] = value >>> 0;
}

function crc32Parts(parts) {
    let crc = 0xffffffff;
    for (const part of parts) {
        for (let i = 0; i < part.length; i++) {
            crc = CRC_TABLE[(crc ^ part[i]) & 0xff] ^ (crc >>> 8);
        }
    }
    return (crc ^ 0xffffffff) >>> 0;
}

function crc32(buffer) {
    return crc32Parts([buffer]);
}

function pngChunk(type, data) {
    const typeBuffer = Buffer.from(type, "ascii");
    const chunk = Buffer.allocUnsafe(12 + data.length);
    chunk.writeUInt32BE(data.length, 0);
    typeBuffer.copy(chunk, 4);
    data.copy(chunk, 8);
    chunk.writeUInt32BE(crc32Parts([typeBuffer, data]), 8 + data.length);
    return chunk;
}

function setDarkPixelRange(row, start, end) {
    for (let x = start; x < end; x++) {
        row[x >> 3] &= ~(1 << (7 - (x & 7)));
    }
}

// qrcode's normal PNG renderer is designed for arbitrary raster artwork.
// This encoder uses a one-bit, two-colour palette, which is much faster and
// produces smaller files while preserving the requested 600px dimensions.
function createQrPng(text, options) {
    const settings = options || {};
    const width = settings.width || 600;
    const margin = settings.margin === undefined ? 2 : settings.margin;
    const dark = settings.dark || [10, 14, 23];
    const light = settings.light || [255, 255, 255];
    const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
    const moduleCount = qr.modules.size;
    const totalModules = moduleCount + (margin * 2);
    const rowBytes = Math.ceil(width / 8);
    const raw = Buffer.alloc((rowBytes + 1) * width, 0xff);
    const whiteRow = Buffer.alloc(rowBytes, 0xff);
    const moduleRows = [];

    for (let moduleY = 0; moduleY < moduleCount; moduleY++) {
        const row = Buffer.alloc(rowBytes, 0xff);
        for (let moduleX = 0; moduleX < moduleCount; moduleX++) {
            if (!qr.modules.get(moduleY, moduleX)) continue;

            const start = Math.ceil(((moduleX + margin) * width) / totalModules);
            const end = Math.ceil(((moduleX + margin + 1) * width) / totalModules);
            setDarkPixelRange(row, start, end);
        }
        moduleRows.push(row);
    }

    for (let y = 0; y < width; y++) {
        const rawOffset = y * (rowBytes + 1);
        raw[rawOffset] = 0; // PNG filter: None

        const moduleY = Math.floor((y * totalModules) / width) - margin;
        const sourceRow = moduleY >= 0 && moduleY < moduleCount
            ? moduleRows[moduleY]
            : whiteRow;
        sourceRow.copy(raw, rawOffset + 1);
    }

    const header = Buffer.alloc(13);
    header.writeUInt32BE(width, 0);
    header.writeUInt32BE(width, 4);
    header[8] = 1; // one bit per palette index
    header[9] = 3; // indexed colour
    header[10] = 0;
    header[11] = 0;
    header[12] = 0;

    return Buffer.concat([
        PNG_SIGNATURE,
        pngChunk("IHDR", header),
        pngChunk("PLTE", Buffer.from([...dark, ...light])),
        pngChunk("IDAT", zlib.deflateSync(raw, { level: 6 })),
        pngChunk("IEND", Buffer.alloc(0))
    ]);
}

function dosDateTime(value) {
    const date = value instanceof Date && !Number.isNaN(value.getTime())
        ? value
        : new Date();
    const year = Math.min(Math.max(date.getFullYear(), 1980), 2107);

    return {
        date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
        time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2)
    };
}

function localFileHeader(nameLength, checksum, size, timestamp) {
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(ZIP_UTF8_FLAG, 6);
    header.writeUInt16LE(ZIP_STORE_METHOD, 8);
    header.writeUInt16LE(timestamp.time, 10);
    header.writeUInt16LE(timestamp.date, 12);
    header.writeUInt32LE(checksum, 14);
    header.writeUInt32LE(size, 18);
    header.writeUInt32LE(size, 22);
    header.writeUInt16LE(nameLength, 26);
    header.writeUInt16LE(0, 28);
    return header;
}

function centralDirectoryHeader(nameLength, checksum, size, offset, timestamp) {
    const header = Buffer.alloc(46);
    header.writeUInt32LE(0x02014b50, 0);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(20, 6);
    header.writeUInt16LE(ZIP_UTF8_FLAG, 8);
    header.writeUInt16LE(ZIP_STORE_METHOD, 10);
    header.writeUInt16LE(timestamp.time, 12);
    header.writeUInt16LE(timestamp.date, 14);
    header.writeUInt32LE(checksum, 16);
    header.writeUInt32LE(size, 20);
    header.writeUInt32LE(size, 24);
    header.writeUInt16LE(nameLength, 28);
    header.writeUInt16LE(0, 30);
    header.writeUInt16LE(0, 32);
    header.writeUInt16LE(0, 34);
    header.writeUInt16LE(0, 36);
    header.writeUInt32LE(0, 38);
    header.writeUInt32LE(offset, 42);
    return header;
}

function endOfCentralDirectory(entryCount, directorySize, directoryOffset) {
    const record = Buffer.alloc(22);
    record.writeUInt32LE(0x06054b50, 0);
    record.writeUInt16LE(0, 4);
    record.writeUInt16LE(0, 6);
    record.writeUInt16LE(entryCount, 8);
    record.writeUInt16LE(entryCount, 10);
    record.writeUInt32LE(directorySize, 12);
    record.writeUInt32LE(directoryOffset, 16);
    record.writeUInt16LE(0, 20);
    return record;
}

function writeChunk(response, chunk) {
    if (response.destroyed || response.writableEnded) {
        return Promise.reject(new Error("Download connection closed"));
    }

    if (response.write(chunk)) return Promise.resolve();

    return new Promise(function (resolve, reject) {
        function cleanup() {
            response.off("drain", handleDrain);
            response.off("error", handleError);
            response.off("close", handleClose);
        }
        function handleDrain() {
            cleanup();
            resolve();
        }
        function handleError(error) {
            cleanup();
            reject(error);
        }
        function handleClose() {
            cleanup();
            reject(new Error("Download connection closed"));
        }

        response.once("drain", handleDrain);
        response.once("error", handleError);
        response.once("close", handleClose);
    });
}

async function streamQrZip(response, entries, options) {
    if (entries.length > 0xffff) {
        throw new Error("Too many QR codes for one ZIP archive");
    }

    const settings = options || {};
    const archiveName = settings.archiveName || "QR-Codes.zip";
    const verifyBase = settings.verifyBase;
    const timestamp = dosDateTime(new Date());
    const centralDirectory = [];
    let offset = 0;

    response.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${archiveName}"`,
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no"
    });
    if (typeof response.flushHeaders === "function") response.flushHeaders();

    for (const entry of entries) {
        const name = Buffer.from(entry.fileName, "utf8");
        const png = createQrPng(verifyBase + entry.code, {
            width: 600,
            margin: 2,
            dark: [10, 14, 23],
            light: [255, 255, 255]
        });
        const checksum = crc32(png);
        const localHeader = localFileHeader(name.length, checksum, png.length, timestamp);
        const entryOffset = offset;

        const localRecord = Buffer.concat([localHeader, name, png]);
        await writeChunk(response, localRecord);
        offset += localRecord.length;

        centralDirectory.push(Buffer.concat([
            centralDirectoryHeader(name.length, checksum, png.length, entryOffset, timestamp),
            name
        ]));
    }

    const directoryOffset = offset;
    const directory = Buffer.concat(centralDirectory);
    const ending = endOfCentralDirectory(
        entries.length,
        directory.length,
        directoryOffset
    );
    await writeChunk(response, Buffer.concat([directory, ending]));
    response.end();
}

module.exports = {
    createQrPng,
    streamQrZip
};
