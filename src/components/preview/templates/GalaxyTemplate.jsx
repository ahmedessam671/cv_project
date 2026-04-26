import React from 'react';

// Helper to determine text color (black or white) based on background color
function getContrastYIQ(hexcolor) {
  if (!hexcolor) return '#ffffff';
  hexcolor = hexcolor.replace("#", "");
  if (hexcolor.length === 3) hexcolor = hexcolor.split('').map(c => c + c).join('');
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#0f172a' : '#ffffff';
}

export function GalaxyTemplate({ data }) {
  const { personalInfo, skills, experience, education } = data;
  const sidebarColor = personalInfo.sidebarColor || '#1e293b';
  const sidebarTextColor = getContrastYIQ(sidebarColor);
  const accentColor = personalInfo.accentColor || '#3b82f6';

  return (
    <div className="template-galaxy" style={{ 
      display: 'flex', 
      minHeight: '100%', 
      fontFamily: 'var(--font-primary), sans-serif', 
      color: '#1f2937', 
      backgroundColor: '#ffffff',
      lineHeight: '1.5'
    }}>
      
      {/* LEFT CONTENT (70%) */}
      <div className="galaxy-main-content" style={{ 
        width: '70%', 
        padding: '32px 40px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px' 
      }}>
        
        {personalInfo.summary && (
          <section className="galaxy-section">
            <h2 style={{ color: accentColor, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '8px', marginBottom: '16px' }}>
              Profile Summary
            </h2>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#4b5563' }}>{personalInfo.summary}</p>
          </section>
        )}

        {experience && experience.length > 0 && (
          <section className="galaxy-section">
            <h2 style={{ color: accentColor, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '8px', marginBottom: '16px' }}>
              Work Experience
            </h2>
            <div className="galaxy-timeline" style={{ position: 'relative', paddingLeft: '24px', borderLeft: `2px solid ${accentColor}40` }}>
              {experience.map((exp, i) => (
                <div key={i} className="cv-experience-item" style={{ position: 'relative', marginBottom: i === experience.length - 1 ? '0' : '20px' }}>
                  <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: accentColor, border: '2px solid #ffffff' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: 'bold' }}>{exp.role}</h3>
                    <div style={{ fontSize: '0.95rem', color: accentColor, fontWeight: '600' }}>{exp.company}</div>
                    {exp.duration && <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px' }}>{exp.duration}</div>}
                  </div>
                  {exp.description && (
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.95rem', color: '#4b5563' }}>
                      {exp.description.split('\n').filter(line => line.trim()).map((line, j) => (
                        <li key={j} style={{ marginBottom: '4px' }}>{line.replace(/^[-\u2022]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section className="galaxy-section">
            <h2 style={{ color: accentColor, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '8px', marginBottom: '16px' }}>
              Education
            </h2>
            <div className="galaxy-timeline" style={{ position: 'relative', paddingLeft: '24px', borderLeft: `2px solid ${accentColor}40` }}>
              {education.map((edu, i) => (
                <div key={i} className="cv-education-item" style={{ position: 'relative', marginBottom: i === education.length - 1 ? '0' : '16px' }}>
                  <div style={{ position: 'absolute', left: '-31px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: accentColor, border: '2px solid #ffffff' }}></div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: 'bold' }}>{edu.degree}</h3>
                  <div style={{ fontSize: '0.95rem', color: accentColor, fontWeight: '600' }}>{edu.institution}</div>
                  {edu.year && <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px' }}>{edu.year}</div>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* RIGHT SIDEBAR (30%) */}
      <div className="galaxy-sidebar" style={{ 
        width: '30%', 
        backgroundColor: sidebarColor, 
        color: sidebarTextColor, 
        padding: '32px 24px',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        {personalInfo.profileImage && (
          <div className="galaxy-profile-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={personalInfo.profileImage} 
              alt="Profile" 
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: personalInfo.imagePosition || 'center',
                border: `4px solid ${sidebarTextColor}30`,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        )}

        <div style={{ textAlign: 'center', width: '100%' }}>
          {personalInfo.name && <h1 style={{ margin: '0 0 8px 0', fontSize: '1.75rem', fontWeight: 'bold', lineHeight: '1.2' }}>{personalInfo.name}</h1>}
          {personalInfo.title && <div style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.9 }}>{personalInfo.title}</div>}
        </div>

        <section style={{ width: '100%' }}>
          <h2 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${sidebarTextColor}40`, paddingBottom: '8px', marginBottom: '12px' }}>
            Contact
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            {personalInfo.phone && <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ opacity: 0.8 }}>☎</span> <span style={{ wordBreak: 'break-word' }}>{personalInfo.phone}</span></li>}
            {personalInfo.email && <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ opacity: 0.8 }}>✉</span> <span style={{ wordBreak: 'break-word' }}>{personalInfo.email}</span></li>}
            {personalInfo.website && <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ opacity: 0.8 }}>🔗</span> <span style={{ wordBreak: 'break-word' }}>{personalInfo.website.replace(/^https?:\/\//, '')}</span></li>}
            {personalInfo.location && <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ opacity: 0.8 }}>📍</span> <span style={{ wordBreak: 'break-word' }}>{personalInfo.location}</span></li>}
          </ul>
        </section>

        {skills && skills.length > 0 && (
          <section style={{ width: '100%' }}>
            <h2 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: `1px solid ${sidebarTextColor}40`, paddingBottom: '8px', marginBottom: '12px' }}>
              Skills
            </h2>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

    </div>
  );
}
