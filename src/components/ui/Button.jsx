import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  ...props 
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const finalClass = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button className={finalClass} {...props}>
      {icon && <span className="btn-icon-inner">{icon}</span>}
      {children}
    </button>
  );
}
