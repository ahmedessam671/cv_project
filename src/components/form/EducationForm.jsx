import React from 'react';
import { DynamicList } from '../ui/DynamicList';

export function EducationForm({ education, onAdd, onChange, onRemove }) {
  const renderItem = (item, index) => {
    const handleChange = (e) => {
      onChange(item.id, e.target.name, e.target.value);
    };

    return (
      <div className="dynamic-item-grid">
        <div className="form-group full-width">
          <label className="form-label">Degree / Certificate</label>
          <input 
            type="text" 
            name="degree" 
            value={item.degree || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="B.S. Computer Science" 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Institution</label>
          <input 
            type="text" 
            name="institution" 
            value={item.institution || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="University Name" 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Graduation Year</label>
          <input 
            type="text" 
            name="year" 
            value={item.year || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="2022" 
          />
        </div>
      </div>
    );
  };

  return (
    <DynamicList 
      items={education} 
      itemName="Education" 
      onAdd={() => onAdd({ degree: '', institution: '', year: '' })} 
      onRemove={onRemove} 
      renderItem={renderItem} 
    />
  );
}
