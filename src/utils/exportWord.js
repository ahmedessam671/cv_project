/**
 * Export CV as a Word .doc file using HTML blob technique.
 * Includes precise MSO (Microsoft Office) optimized HTML/CSS to closely mimic
 * the React visual templates (Classic and Modern layouts).
 */

export function exportToWord(cv, template) {
  const html = buildWordHTML(cv, template);
  const blob = new Blob(
    ['\ufeff', html],
    { type: 'application/msword' }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const name = cv.personalInfo?.name?.replace(/\s+/g, '_') || 'Resume';
  link.href = url;
  link.download = `${name}_CV.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function buildWordHTML(cv, template) {
  const isModern = template === 'modern';

  const docWrapperStart = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="UTF-8">
  <style>
    /* Base Word Page Spec */
    @page { 
      size: 21cm 29.7cm; 
      margin: ${isModern ? '0cm 0cm 0cm 0cm' : '1.5cm 1.8cm'}; 
      mso-page-orientation: portrait;
    }
    body {
      font-family: ${isModern ? 'Arial, sans-serif' : 'Georgia, serif'};
      font-size: 10.5pt;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    table { border-collapse: collapse; width: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    td { vertical-align: top; }
    p { margin: 0 0 4pt 0; padding: 0; }
    h1, h2, h3 { margin: 0; padding: 0; }
  </style>
</head>
<body>
`;

  const docWrapperEnd = `
</body>
</html>
`;

  const content = isModern ? buildModernContent(cv) : buildClassicContent(cv);
  
  return docWrapperStart + content + docWrapperEnd;
}

/* ==============================================================
   CLASSIC TEMPLATE EXPORT (Center headers, horizontal dividers)
   ============================================================== */
function buildClassicContent(cv) {
  const { personalInfo = {}, skills = [], experience = [], education = [], projects = [] } = cv;
  const { name, title, email, phone, location, summary } = personalInfo;

  let html = `
    <div style="text-align: center; margin-bottom: 20pt; border-bottom: 2pt solid #1a1a1a; padding-bottom: 10pt;">
      <h1 style="font-size: 26pt; color: #0f172a; font-family: Georgia, serif; font-weight: bold; margin-bottom: 4pt;">
        ${name || 'Full Name'}
      </h1>
      ${title ? `<p style="font-size: 12pt; color: #475569; font-style: italic; margin-bottom: 8pt;">${title}</p>` : ''}
      <p style="font-size: 9.5pt; color: #475569;">
        ${[email, phone, location].filter(Boolean).join(' &nbsp;&bull;&nbsp; ')}
      </p>
    </div>
  `;

  if (summary) {
    html += `
      <div style="margin-bottom: 15pt;">
        <h2 style="font-size: 11pt; color: #0f172a; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 4pt; margin-bottom: 8pt;">Professional Summary</h2>
        <p style="font-size: 9.5pt; color: #334155; line-height: 1.7;">${summary}</p>
      </div>
    `;
  }

  if (skills.length > 0) {
    html += `
      <div style="margin-bottom: 15pt;">
        <h2 style="font-size: 11pt; color: #0f172a; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 4pt; margin-bottom: 8pt;">Skills</h2>
        <p style="font-size: 9.5pt; color: #334155;">${skills.join('  &bull;  ')}</p>
      </div>
    `;
  }

  if (experience.length > 0) {
    html += `
      <div style="margin-bottom: 15pt;">
        <h2 style="font-size: 11pt; color: #0f172a; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 4pt; margin-bottom: 8pt;">Work Experience</h2>
        ${experience.map(exp => `
          <div style="margin-bottom: 12pt;">
            <table>
              <tr>
                <td style="text-align: left;">
                  <span style="font-size: 10.5pt; font-weight: bold; color: #0f172a;">${exp.role || ''}</span><br/>
                  <span style="font-size: 10pt; color: #475569; font-style: italic;">${exp.company || ''}</span>
                </td>
                <td style="text-align: right; width: 120pt; font-size: 9.5pt; color: #64748b;">
                  ${exp.duration || ''}
                </td>
              </tr>
            </table>
            ${exp.description ? `<div style="font-size: 9.5pt; color: #334155; margin-top: 4pt;">${exp.description.replace(/\n/g, '<br/>')}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  if (education.length > 0) {
    html += `
      <div style="margin-bottom: 15pt;">
        <h2 style="font-size: 11pt; color: #0f172a; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 4pt; margin-bottom: 8pt;">Education</h2>
        ${education.map(edu => `
          <div style="margin-bottom: 8pt;">
            <table>
              <tr>
                <td style="text-align: left;">
                  <span style="font-size: 10.5pt; font-weight: bold; color: #0f172a;">${edu.degree || ''}</span><br/>
                  <span style="font-size: 10pt; color: #475569; font-style: italic;">${edu.institution || ''}</span>
                </td>
                <td style="text-align: right; width: 80pt; font-size: 9.5pt; color: #64748b;">
                  ${edu.year || ''}
                </td>
              </tr>
            </table>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (projects.length > 0) {
    html += `
      <div style="margin-bottom: 15pt;">
        <h2 style="font-size: 11pt; color: #0f172a; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 1pt solid #cbd5e1; padding-bottom: 4pt; margin-bottom: 8pt;">Projects</h2>
        ${projects.map(proj => `
          <div style="margin-bottom: 10pt;">
            <span style="font-size: 10.5pt; font-weight: bold; color: #0f172a;">${proj.name || ''}</span>
            ${proj.tech ? `<span style="font-size: 9pt; color: #475569; font-style: italic;"> &mdash; ${proj.tech}</span>` : ''}
            ${proj.description ? `<div style="font-size: 9.5pt; color: #334155; margin-top: 4pt;">${proj.description.replace(/\n/g, '<br/>')}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  return html;
}

/* ==============================================================
   MODERN TEMPLATE EXPORT (Two columns via giant table)
   ============================================================== */
function buildModernContent(cv) {
  const { personalInfo = {}, skills = [], experience = [], education = [], projects = [] } = cv;
  const { name, title, email, phone, location, summary } = personalInfo;

  // Use a giant 100% width table to simulate flex columns. Office needs HTML tables.
  const colLeftBg = '#4f46e5';
  const colLeftColor = '#ffffff';

  let html = `
    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; min-height: 29.7cm;">
      <tr>
        <!-- LEFT SIDEBAR -->
        <td style="width: 30%; background-color: ${colLeftBg}; padding: 30pt 20pt; vertical-align: top;">
          
          <h1 style="font-size: 18pt; font-weight: bold; color: ${colLeftColor}; margin-bottom: 4pt; font-family: Arial, sans-serif;">
            ${(name || 'Full Name').toUpperCase()}
          </h1>
          <p style="font-size: 9.5pt; color: #e0e7ff; margin-bottom: 25pt;">${title || ''}</p>

          <!-- CONTACT -->
          <h2 style="font-size: 7.5pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1pt; color: #a5b4fc; border-bottom: 1pt solid #818cf8; padding-bottom: 4pt; margin-bottom: 10pt;">
            Contact
          </h2>
          ${email ? `<p style="font-size: 8.5pt; color: ${colLeftColor}; margin-bottom: 4pt;">${email}</p>` : ''}
          ${phone ? `<p style="font-size: 8.5pt; color: ${colLeftColor}; margin-bottom: 4pt;">${phone}</p>` : ''}
          ${location ? `<p style="font-size: 8.5pt; color: ${colLeftColor}; margin-bottom: 15pt;">${location}</p>` : ''}


          <!-- SKILLS -->
          ${skills.length > 0 ? `
            <h2 style="font-size: 7.5pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1pt; color: #a5b4fc; border-bottom: 1pt solid #818cf8; padding-bottom: 4pt; margin-bottom: 10pt; margin-top:20pt;">
              Core Skills
            </h2>
            ${skills.map(skill => `
              <p style="font-size: 8.5pt; color: ${colLeftColor}; margin-bottom: 4pt;">&#x25AA; ${skill}</p>
            `).join('')}
          ` : ''}

        </td>

        <!-- RIGHT MAIN CONTENT -->
        <td style="width: 70%; padding: 30pt 25pt; vertical-align: top; background-color: #ffffff;">

          ${summary ? `
            <div style="margin-bottom: 15pt;">
              <h2 style="font-size: 10pt; font-weight: bold; color: ${colLeftBg}; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 2pt solid #e0e7ff; padding-bottom: 4pt; margin-bottom: 8pt;">Profile</h2>
              <p style="font-size: 9pt; color: #475569; line-height: 1.6;">${summary}</p>
            </div>
          ` : ''}

          ${experience.length > 0 ? `
            <div style="margin-bottom: 15pt;">
              <h2 style="font-size: 10pt; font-weight: bold; color: ${colLeftBg}; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 2pt solid #e0e7ff; padding-bottom: 4pt; margin-bottom: 10pt;">Experience</h2>
              ${experience.map(exp => `
                <div style="margin-bottom: 12pt;">
                  <table style="margin-bottom: 2pt;">
                    <tr>
                      <td style="text-align: left;">
                        <span style="font-size: 10pt; font-weight: bold; color: #0f172a;">${exp.role || ''}</span>
                      </td>
                      <td style="text-align: right; width: 100pt;">
                        <span style="font-size: 8.5pt; color: #4f46e5; background-color: #e0e7ff; padding: 2pt 4pt;">${exp.duration || ''}</span>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size: 9pt; color: #6366f1; font-weight: bold; margin-bottom: 4pt;">${exp.company || ''}</p>
                  ${exp.description ? `<div style="font-size: 9pt; color: #475569; line-height: 1.5;">${exp.description.replace(/\n/g, '<br/>')}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${education.length > 0 ? `
            <div style="margin-bottom: 15pt;">
              <h2 style="font-size: 10pt; font-weight: bold; color: ${colLeftBg}; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 2pt solid #e0e7ff; padding-bottom: 4pt; margin-bottom: 10pt;">Education</h2>
              ${education.map(edu => `
                <div style="margin-bottom: 8pt;">
                  <table style="margin-bottom: 2pt;">
                    <tr>
                      <td style="text-align: left;">
                        <span style="font-size: 10pt; font-weight: bold; color: #0f172a;">${edu.degree || ''}</span>
                      </td>
                      <td style="text-align: right; width: 80pt;">
                        <span style="font-size: 8.5pt; color: #94a3b8;">${edu.year || ''}</span>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size: 9pt; color: #6366f1; font-weight: bold;">${edu.institution || ''}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${projects.length > 0 ? `
            <div style="margin-bottom: 15pt;">
              <h2 style="font-size: 10pt; font-weight: bold; color: ${colLeftBg}; text-transform: uppercase; letter-spacing: 1pt; border-bottom: 2pt solid #e0e7ff; padding-bottom: 4pt; margin-bottom: 10pt;">Projects</h2>
              ${projects.map(proj => `
                <div style="margin-bottom: 10pt;">
                  <span style="font-size: 10pt; font-weight: bold; color: #0f172a;">${proj.name || ''}</span>
                  ${proj.tech ? `<p style="font-size: 9pt; color: #6366f1; margin: 2pt 0 4pt;">${proj.tech}</p>` : ''}
                  ${proj.description ? `<div style="font-size: 9pt; color: #475569; line-height: 1.5;">${proj.description.replace(/\n/g, '<br/>')}</div>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

        </td>
      </tr>
    </table>
  `;

  return html;
}
