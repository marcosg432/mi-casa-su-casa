import React from 'react';
import './AspectRatio.css';

export const AspectRatio = React.forwardRef(({ children, ratio, className = '' }, ref) => {
  return (
    <div
      ref={ref}
      className={`aspect-ratio ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
});

AspectRatio.displayName = 'AspectRatio';




