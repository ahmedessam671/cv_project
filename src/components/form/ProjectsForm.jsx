import React from 'react';
import { DynamicList } from '../ui/DynamicList';

export function ProjectsForm({ projects, onAdd, onChange, onRemove }) {
  const renderItem = (item, index) => {
    const handleChange = (e) => {
      onChange(item.id, e.target.name, e.target.value);
    };

    return (
      <div className="dynamic-item-grid">
        <div className="form-group full-width">
          <label className="form-label">Project Name</label>
          <input 
            type="text" 
            name="name" 
            value={item.name || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="E-commerce Dashboard" 
          />
        </div>
        
        <div className="form-group full-width">
          <label className="form-label">Technologies Used</label>
          <input 
            type="text" 
            name="tech" 
            value={item.tech || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="React, Node.js, MongoDB" 
          />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Description</label>
          <textarea 
            name="description" 
            value={item.description || ''} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="Built a full-stack dashboard..." 
          />
        </div>
      </div>
    );
  };

  return (
    <DynamicList 
      items={projects} 
      itemName="Project" 
      onAdd={() => onAdd({ name: '', tech: '', description: '' })} 
      onRemove={onRemove} 
      renderItem={renderItem} 
    />
  );
}
