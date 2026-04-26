import React from 'react';
import { Button } from './Button';

export function DynamicList({ items, onAdd, onRemove, renderItem, itemName = 'Item' }) {
  return (
    <div className="dynamic-list">
      {items.map((item, index) => (
        <div key={item.id} className="dynamic-item">
          <div className="dynamic-item-header">
            <span className="dynamic-item-number">{index + 1}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRemove(item.id)}
              className="dynamic-item-remove"
              title="Remove Item"
            >
              ✕
            </Button>
          </div>
          <div className="dynamic-item-content">
            {renderItem(item, index)}
          </div>
        </div>
      ))}
      <Button 
        variant="secondary" 
        onClick={onAdd}
        style={{ width: '100%', marginTop: 'var(--space-2)' }}
      >
        + Add {itemName}
      </Button>
    </div>
  );
}
