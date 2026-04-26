import React from 'react';
import { Button } from '../ui/Button';
import { exportToWord } from '../../utils/exportWord';
import { useReactToPrint } from 'react-to-print';

export function Header({ cvData, toggleDarkMode, darkMode, printRef }) {
  const handleExportWord = () => {
    exportToWord(cvData, cvData.template);
  };

  const handleExportPDF = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${cvData.personalInfo?.name?.replace(/\s+/g, '_') || 'Resume'}_CV`,
    onAfterPrint: () => console.log('Successfully printed/exported to PDF!'),
  });

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo">CV</div>
        <div>
          <h1 className="header-title">ATS Resume Builder</h1>
          <div className="header-subtitle">Build a recruiter-ready CV in minutes</div>
        </div>
      </div>

      <div className="header-center"></div>

      <div className="header-actions">
        <label className="toggle-label" title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <span style={{ fontSize: '1.2rem' }}>{darkMode ? '🌙' : '☀️'}</span>
          <input 
            type="checkbox" 
            className="toggle-input" 
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <div className="toggle-track">
            <div className="toggle-thumb"></div>
          </div>
        </label>

        <div style={{ width: '1px', height: '24px', background: 'var(--color-border)', margin: '0 var(--space-2)' }} />

        <Button 
          variant="secondary" 
          icon="📄" 
          onClick={handleExportWord}
        >
          Export Word
        </Button>
        <Button 
          variant="primary" 
          icon="🖨️" 
          onClick={handleExportPDF}
          className="no-print"
        >
          Export PDF
        </Button>
      </div>
    </header>
  );
}
