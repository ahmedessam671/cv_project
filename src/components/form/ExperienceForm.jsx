import React from 'react';
import { DynamicList } from '../ui/DynamicList';

export function ExperienceForm({ experience, onAdd, onChange, onRemove }) {
  const renderItem = (item, index) => {
    const handleChange = (e) => {
      onChange(item.id, e.target.name, e.target.value);
    };

    return (
      <div className="dynamic-item-grid">
        <div className="form-group full-width">
          <label className="form-label">Job Title / Role</label>
          <input 
            type="text" 
            name="role" 
            value={item.role || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="Senior Developer" 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Company</label>
          <input 
            type="text" 
            name="company" 
            value={item.company || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="Tech Corp Inc." 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Duration</label>
          <input 
            type="text" 
            name="duration" 
            value={item.duration || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="Jan 2020 - Present" 
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Description & Achievements</label>
          <textarea 
            name="description" 
            value={item.description || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="• Developed new features...&#10;• Increased performance by 30%..." 
          />
          <div className="form-hint">Use bullet points and measurable achievements (e.g., "Increased sales by 20%").</div>
        </div>
      </div>
    );
  };

  return (
    <DynamicList 
      items={experience} 
      itemName="Experience" 
      onAdd={() => onAdd({ role: '', company: '', duration: '', description: '' })} 
      onRemove={onRemove} 
      renderItem={renderItem} 
    />
  );
}
