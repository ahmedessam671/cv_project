import React from 'react';

export function ModernTemplate({ data }) {
  const { personalInfo, skills, experience, education, projects } = data;

  return (
    <div className="template-modern">
      <aside className="modern-sidebar">
        {personalInfo.name && <h1 className="modern-name">{personalInfo.name}</h1>}
        {personalInfo.title && <div className="modern-title">{personalInfo.title}</div>}
        
        <section className="modern-sidebar-section">
          <h2 className="modern-sidebar-title">Contact</h2>
          {personalInfo.email && <div className="modern-contact-item">✉ {personalInfo.email}</div>}
          {personalInfo.phone && <div className="modern-contact-item">☎ {personalInfo.phone}</div>}
          {personalInfo.website && <div className="modern-contact-item">🔗 {personalInfo.website.replace(/^https?:\/\//, '')}</div>}
          {personalInfo.location && <div className="modern-contact-item">📍 {personalInfo.location}</div>}
        </section>

        {skills && skills.length > 0 && (
          <section className="modern-sidebar-section">
            <h2 className="modern-sidebar-title">Core Skills</h2>
            {skills.map((skill, i) => (
              <div key={i} className="modern-skill-item">
                <span className="modern-skill-name">{skill}</span>
                <div className="modern-skill-bar">
                  <div className="modern-skill-fill" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                </div>
              </div>
            ))}
          </section>
        )}
      </aside>

      <main className="modern-main">
        {personalInfo.summary && (
          <section className="modern-section">
            <h2 className="modern-section-title">Profile</h2>
            <div className="modern-summary">{personalInfo.summary}</div>
          </section>
        )}

        {experience && experience.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="modern-entry cv-experience-item">
                <div className="modern-entry-header">
                  <div>
                    <div className="modern-entry-title">{exp.role}</div>
                    <div className="modern-entry-sub">{exp.company}</div>
                  </div>
                  {exp.duration && <div className="modern-entry-date">{exp.duration}</div>}
                </div>
                {exp.description && (
                  <div className="modern-entry-desc" style={{ whiteSpace: 'pre-wrap' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {education && education.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="modern-entry cv-education-item">
                <div className="modern-entry-header">
                  <div>
                    <div className="modern-entry-title">{edu.degree}</div>
                    <div className="modern-entry-sub">{edu.institution}</div>
                  </div>
                  {edu.year && <div className="modern-entry-date">{edu.year}</div>}
                </div>
              </div>
            ))}
          </section>
        )}

        {projects && projects.length > 0 && (
          <section className="modern-section">
            <h2 className="modern-section-title">Projects</h2>
            {projects.map((proj, i) => (
              <div key={i} className="modern-entry cv-project-item">
                <div className="modern-entry-header">
                  <div>
                    <div className="modern-entry-title">{proj.name}</div>
                    {proj.tech && <div className="modern-entry-sub">{proj.tech}</div>}
                  </div>
                </div>
                {proj.description && (
                  <div className="modern-entry-desc" style={{ whiteSpace: 'pre-wrap' }}>
                    {proj.description}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
