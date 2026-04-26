import React, { useState } from 'react';

export function FormSection({ title, icon, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="form-section">
      <div 
        className="form-section-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="form-section-title">
          {icon && <span className="form-section-icon">{icon}</span>}
          {title}
        </div>
        <div className={`form-section-chevron ${isOpen ? 'open' : ''}`}>
          ▼
        </div>
      </div>
      {isOpen && (
        <div className="form-section-body">
          {children}
        </div>
      )}
    </div>
  );
}
