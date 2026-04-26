import React, { useState } from 'react';
import { Button } from '../ui/Button';

export function SkillsForm({ skills, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAdd();
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Add a skill</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="form-control" 
            placeholder="e.g. React, Node.js (Press Enter)" 
          />
          <Button onClick={handleAdd} type="button">Add</Button>
        </div>
      </div>

      <div className="skill-tags">
        {skills.map((skill, i) => (
          <span key={i} className="skill-tag">
            {skill}
            <span className="skill-tag-remove" onClick={() => removeSkill(skill)}>✕</span>
          </span>
        ))}
      </div>
    </div>
  );
}
