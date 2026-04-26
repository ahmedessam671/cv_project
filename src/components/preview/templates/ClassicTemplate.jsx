import React from 'react';

export function ClassicTemplate({ data }) {
  const { personalInfo, skills, experience, education, projects } = data;

  return (
    <div className="template-classic">
      <header className="classic-header">
        {personalInfo.name && <h1 className="classic-name">{personalInfo.name}</h1>}
        {personalInfo.title && <div className="classic-title">{personalInfo.title}</div>}
        
        <div className="classic-contact">
          {personalInfo.email && <span className="classic-contact-item">✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span className="classic-contact-item">☎ {personalInfo.phone}</span>}
          {personalInfo.website && <span className="classic-contact-item">🔗 {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.location && <span className="classic-contact-item">📍 {personalInfo.location}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section className="classic-section">
          <h2 className="classic-section-title">Professional Summary</h2>
          <div className="classic-summary">{personalInfo.summary}</div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Skills</h2>
          <div className="classic-skills-list">
            {skills.map((skill, i) => (
              <span key={i} className="classic-skill-item">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Work Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="classic-entry cv-experience-item">
              <div className="classic-entry-header">
                <div>
                  <div className="classic-entry-title">{exp.role}</div>
                  <div className="classic-entry-sub">{exp.company}</div>
                </div>
                {exp.duration && <div className="classic-entry-date">{exp.duration}</div>}
              </div>
              {exp.description && (
                <div className="classic-entry-desc" style={{ whiteSpace: 'pre-wrap' }}>
                  {exp.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="classic-entry cv-education-item">
              <div className="classic-entry-header">
                <div>
                  <div className="classic-entry-title">{edu.degree}</div>
                  <div className="classic-entry-sub">{edu.institution}</div>
                </div>
                {edu.year && <div className="classic-entry-date">{edu.year}</div>}
              </div>
            </div>
          ))}
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="classic-section">
          <h2 className="classic-section-title">Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="classic-entry cv-project-item">
              <div className="classic-entry-header">
                <div>
                  <div className="classic-entry-title">{proj.name}</div>
                  {proj.tech && <div className="classic-entry-sub">Tech: {proj.tech}</div>}
                </div>
              </div>
              {proj.description && (
                <div className="classic-entry-desc" style={{ whiteSpace: 'pre-wrap' }}>
                  {proj.description}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
