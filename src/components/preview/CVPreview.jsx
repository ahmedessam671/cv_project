import React from 'react';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { GalaxyTemplate } from './templates/GalaxyTemplate';

export function CVPreview({ cvData, updateTemplate, printRef }) {
  return (
    <div className="preview-panel">
      <div className="preview-toolbar no-print">
        <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginRight: '8px' }}>
          Template:
        </div>
        <div className="tabs">
          <div
            className={`tab ${cvData.template === 'classic' ? 'active' : ''}`}
            onClick={() => updateTemplate('classic')}
          >
            Classic
          </div>
          <div
            className={`tab ${cvData.template === 'modern' ? 'active' : ''}`}
            onClick={() => updateTemplate('modern')}
          >
            Modern
          </div>
          <div 
            className={`tab ${cvData.template === 'galaxy' ? 'active' : ''}`}
            onClick={() => updateTemplate('galaxy')}
          >
            Galaxy
          </div>
        </div>
      </div>

      {/* The ref is attached to this printable wrapper */}
      <div className="cv-page" id="print-root" ref={printRef}>
        {cvData.template === 'classic' ? (
          <ClassicTemplate data={cvData} />
        ) : cvData.template === 'galaxy' ? (
          <GalaxyTemplate data={cvData} />
        ) : (
          <ModernTemplate data={cvData} />
        )}
      </div>
    </div>
  );
}
