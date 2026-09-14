import React from 'react';

export default function MediaRenderer({ src, alt, className = "", size = "large", style = {} }) {
    if (!src) return null;

    const lowerSrc = src.toLowerCase();
    const isVideo = lowerSrc.match(/\.(mp4|webm|ogg)$/i);
    const isAudio = lowerSrc.match(/\.(mp3|wav|ogg)$/i);

    const maxWidth = size === "small" ? "200px" : size === "medium" ? "350px" : "550px";

    const baseStyle = {
        width: '100%',
        maxWidth: maxWidth,
        borderRadius: 8,
        display: 'block',
        margin: '0 auto',
        ...style
    };
    const imageStyle = {
        ...baseStyle,
        height: style.height || 'auto'
    };

    if (isVideo) {
        return (
            <video
                className={className}
                controls
                preload="metadata"
                style={baseStyle}
            >
                <source src={src} />
                Your browser does not support the video tag.
            </video>
        );
    }

    if (isAudio) {
        return (
            <audio className={className} controls preload="metadata" style={{ ...baseStyle, height: 'auto' }}>
                <source src={src} />
                Your browser does not support the audio element.
            </audio>
        );
    }

    // Fallback to Image
    return (
        <img
            src={src}
            alt={alt || "Media"}
            className={className}
            loading="lazy"
            style={imageStyle}
        />
    );
}
