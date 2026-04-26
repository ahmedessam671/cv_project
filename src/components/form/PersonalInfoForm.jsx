import React from 'react';

export function PersonalInfoForm({ data, onChange, template }) {
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="dynamic-item-grid">
      <div className="form-group full-width">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="name"
          value={data.name || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="John Doe"
        />
      </div>

      <div className="form-group full-width">
        <label className="form-label">Professional Title</label>
        <input
          type="text"
          name="title"
          value={data.title || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="Senior Frontend Developer"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={data.email || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="john@example.com"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          name="phone"
          value={data.phone || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="+1 234 567 8900"
        />
      </div>

      <div className="form-group full-width">
        <label className="form-label">Location</label>
        <input
          type="text"
          name="location"
          value={data.location || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="New York, NY"
        />
      </div>

      <div className="form-group full-width">
        <label className="form-label">Website / LinkedIn</label>
        <input
          type="url"
          name="website"
          value={data.website || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      <div className="form-group full-width">
        <label className="form-label">Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="Brief summary of your professional experience and key skills..."
        />
        <div className="form-hint">A strong summary significantly improves ATS scores.</div>
      </div>

      {template === 'galaxy' && (
        <>
          <div className="form-group full-width">
            <label className="form-label">Profile Image</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    onChange('profileImage', url);
                  }
                }} 
                className="form-control" 
                style={{ padding: '8px', flex: 1 }}
              />
              <select 
                name="imagePosition" 
                value={data.imagePosition || 'center'} 
                onChange={handleChange} 
                className="form-control"
                style={{ width: '120px' }}
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="form-hint">Optional. Position adjusts how the image is framed within the circle.</div>
          </div>

          <div className="form-group full-width" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <label className="form-label">Sidebar Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input 
                  type="color" 
                  name="sidebarColor" 
                  value={data.sidebarColor || '#1e293b'} 
                  onChange={handleChange} 
                  className="form-control" 
                  style={{ width: '60px', height: '40px', padding: '2px', cursor: 'pointer' }}
                />
              </div>
            </div>
            <div>
              <label className="form-label">Accent Color (Timeline nodes, Headings)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input 
                  type="color" 
                  name="accentColor" 
                  value={data.accentColor || '#3b82f6'} 
                  onChange={handleChange} 
                  className="form-control" 
                  style={{ width: '60px', height: '40px', padding: '2px', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
