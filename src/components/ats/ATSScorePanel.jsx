import React, { useState, useEffect } from 'react';
import { computeATSScore } from '../../utils/atsScorer';

export function ATSScorePanel({ cvData }) {
  const [scoreData, setScoreData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setScoreData(computeATSScore(cvData));
  }, [cvData]);

  if (!scoreData) return null;

  const { total, breakdown, suggestions } = scoreData;

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--color-score-high)';
    if (score >= 60) return 'var(--color-score-mid)';
    return 'var(--color-score-low)';
  };

  const ringColor = getScoreColor(total);
  const dashOffset = 283 - (283 * total) / 100;

  return (
    <div className="ats-score-panel">
      <div className="ats-score-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="ats-score-title">
          <span style={{ fontSize: '1.2rem' }}>🎯</span> ATS Score
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <strong style={{ color: ringColor, fontSize: '1.1rem' }}>{total}/100</strong>
          <div className={`form-section-chevron ${isOpen ? 'open' : ''}`}>▼</div>
        </div>
      </div>

      {isOpen && (
        <div className="ats-score-body">
          <div className="ats-score-ring-wrap">
            <svg width="100" height="100" viewBox="0 0 100 100" className="ats-ring-svg">
              <circle cx="50" cy="50" r="45" className="ats-ring-bg" />
              <circle 
                cx="50" cy="50" r="45" 
                className="ats-ring-fg" 
                strokeDasharray="283"
                strokeDashoffset={dashOffset}
                stroke={ringColor}
              />
            </svg>
            <div style={{ position: 'absolute', marginLeft: '25px', textAlign: 'center' }}>
              <div className="ats-score-num" style={{ color: ringColor }}>{total}</div>
            </div>
            
            <div className="ats-score-breakdown">
              <BreakdownItem label="Sections" value={breakdown.sections.score} max={breakdown.sections.max} />
              <BreakdownItem label="Keywords" value={breakdown.keywords.score} max={breakdown.keywords.max} />
              <BreakdownItem label="Action Verbs" value={breakdown.verbs.score} max={breakdown.verbs.max} />
              <BreakdownItem label="Achievements" value={breakdown.achievements.score} max={breakdown.achievements.max} />
              <BreakdownItem label="Contact Info" value={breakdown.contact.score} max={breakdown.contact.max} />
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="ats-suggestions">
              <strong>Suggestions to improve:</strong>
              {suggestions.map((s, i) => (
                <div key={i} className={`ats-suggestion-item ${s.type}`}>
                  {s.type === 'warn' ? '⚠️' : '✅'} {s.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BreakdownItem({ label, value, max }) {
  const percent = (value / max) * 100;
  return (
    <div className="ats-breakdown-item">
      <div className="ats-breakdown-label">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="ats-breakdown-bar">
        <div 
          className="ats-breakdown-fill" 
          style={{ width: `${percent}%`, backgroundColor: percent < 50 ? 'var(--color-warning)' : 'var(--color-success)' }} 
        />
      </div>
    </div>
  );
}
