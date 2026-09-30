import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { authorData, authorTimeline } from '../data/yismakeData';
import PageBanner from '../components/PageBanner';

export default function About() {
  const { lang } = useLanguage();

  return (
    <div style={{ background: 'var(--bg-primary)', color: '#1a1714', fontFamily: 'var(--font-sans)' }}>
      <PageBanner title={lang === 'am' ? 'ስለ ደራሲ ይስማዕከ ወርቁ' : 'About'} />

      <div className="site-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem 5rem' }}>
        {/* Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            fontSize: '1rem',
            color: '#8a857d',
            maxWidth: '500px',
            margin: '0 auto',
            fontFamily: 'var(--font-serif)',
            lineHeight: 1.7,
          }}>
            {lang === 'am'
              ? 'የኢትዮጵያ ሳይንስ ልቦለድ ፈር-ቀዳጅ፣ የደብረ ማርቆስ ዩኒቨርሲቲ መምህርና የ«ዴርቶጋዳ» ደራሲ የህይወት ጉዞ።'
              : "The life, inspirations, and literary journey of one of Ethiopia\u2019s most transformative contemporary novelists."}
          </p>
        </div>

        {/* Lead Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: '3rem', alignItems: 'start', marginBottom: '5rem' }}>
          {/* Polaroid Photo Stack */}
          <div className="lg:col-span-5" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="jkr-polaroid-stack">
              <div className="jkr-polaroid-back-1">
                <div style={{ width: '100%', height: '224px', overflow: 'hidden', background: '#edeae4' }}>
                  <img src="/images/library-bg.jpg" alt="Archival notes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="jkr-polaroid-back-2">
                <div style={{ width: '100%', height: '224px', overflow: 'hidden', background: '#edeae4' }}>
                  <img src="/images/dertogada-art.jpg" alt="Dertogada Universe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="jkr-polaroid-front">
                <div style={{ width: '100%', height: '256px', overflow: 'hidden', background: '#1a1714', marginBottom: '12px' }}>
                  <img src={authorData.portrait} alt="Yismake Worku" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.875rem', fontWeight: 600, color: '#1a1714' }}>
                  Yismake Worku
                </div>
                <div style={{ fontSize: '0.6875rem', color: '#8a857d' }}>
                  Gojjam &amp; Addis Ababa, Ethiopia
                </div>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', lineHeight: 1.8, color: '#3d3a35' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              fontWeight: 700,
              color: '#1a1714',
              marginBottom: '1rem',
            }}>
              {lang === 'am' ? 'የህይወትና የስነ-ጽሑፍ ታሪክ' : 'Early Life & The Breakthrough'}
            </h2>

            <p style={{ marginBottom: '1.25rem' }}>{lang === 'am' ? authorData.bio.am : authorData.bio.en}</p>

            {/* Quote Block */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--bg-secondary)',
              borderLeft: '3px solid #c9a84c',
              borderRadius: '0 6px 6px 0',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: '#5a564e',
              marginBottom: '1.5rem',
            }}>
              {lang === 'am'
                ? '\u00AB\u1325\u1295\u1273\u12CA\u12CD \u12E8\u12A2\u1275\u12EE\u1335\u12EB \u1308\u12F3\u121B\u12CA \u1325\u1264\u1265\u1293 \u12E8\u1265\u122B\u1293 \u121D\u1235\u1325\u122D \u12A8\u12D8\u1218\u1293\u12CA\u12CD \u12E8\u1320\u134B\u122D \u121D\u122D\u121D\u122D\u1363 \u1274\u12AD\u1296\u120E\u1302 \u12A5\u1293 \u12A0\u1308\u122B\u12CA \u1209\u12A3\u120B\u12CA\u1290\u1275 \u130B\u122D \u12E8\u121A\u1308\u1293\u129D\u1260\u1275 \u12F5\u1295\u1245 \u12E8\u120D\u1266\u1208\u12F5 \u12D3\u1208\u121D\u1362\u00BB'
                : '\u201CWhere ancient Ethiopian monastic contemplation meets orbital rocketry, cybersecurity, and the sovereign African mind.\u201D'}
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2" style={{ gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #edeae4', fontSize: '0.8125rem' }}>
              {[
                { label: 'Origins', value: 'Gojjam / Lake Tana' },
                { label: 'Published Novels', value: '15+ Books' },
                { label: 'Dertogada Debut', value: '200,000+ Copies' },
                { label: 'UK Award', value: 'TA Prize Shortlist' },
              ].map((fact) => (
                <div key={fact.label} style={{
                  padding: '0.75rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid #edeae4',
                  borderRadius: '6px',
                }}>
                  <span style={{
                    display: 'block',
                    fontSize: '0.5625rem',
                    fontWeight: 700,
                    color: '#c9a84c',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                    marginBottom: '2px',
                  }}>{fact.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    color: '#1a1714',
                    fontSize: '0.875rem',
                  }}>{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ paddingTop: '3rem', borderTop: '1px solid #edeae4' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="jkr-gold-divider" style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#c9a84c' }}>❖</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              fontWeight: 700,
              color: '#1a1714',
            }}>
              {lang === 'am' ? 'የህይወትና የደራሲነት ዋና ዋና ምዕራፎች' : 'Milestones in the Literary Journey'}
            </h2>
          </div>

          <div style={{
            position: 'relative',
            borderLeft: '2px solid #edeae4',
            marginLeft: '1rem',
            paddingLeft: '2rem',
          }}
            className="sm:ml-28 sm:pl-10"
          >
            {authorTimeline.map((item, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  marginBottom: idx < authorTimeline.length - 1 ? '2.5rem' : 0,
                  transition: 'all 0.3s',
                }}
                className="group"
              >
                {/* Node Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-2.6rem',
                  top: '6px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#fdfcfa',
                  border: '2px solid #c9a84c',
                  transition: 'all 0.3s',
                }}
                  className="sm:-left-[47px] group-hover:bg-[#c9a84c]"
                />

                {/* Year */}
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#c9a84c',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem',
                  fontFamily: 'var(--font-sans)',
                }}>
                  {item.year}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  fontWeight: 700,
                  color: '#1a1714',
                  marginBottom: '0.5rem',
                }}>
                  {lang === 'am' ? item.titleAm : item.titleEn}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9375rem',
                  color: '#5a564e',
                  lineHeight: 1.7,
                  maxWidth: '560px',
                }}>
                  {lang === 'am' ? item.descAm : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '3rem',
          borderTop: '1px solid #edeae4',
          textAlign: 'center',
        }}>
          <Link to="/books" className="jkr-pill-btn-dark" style={{ fontSize: '0.875rem' }}>
            {lang === 'am' ? 'የተሟላ 15+ መጻሕፍት ካታሎግ ይመልከቱ →' : 'Explore The Books →'}
          </Link>
        </div>
      </div>
    </div>
  );
}
