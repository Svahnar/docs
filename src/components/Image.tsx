import React from 'react';

interface ImageProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  helpText?: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt = 'Image', 
  width = '100%', 
  height = 'auto',
  className = '',
  helpText
}) => {
  const HelpText = helpText ? (
    <div 
      style={{
        marginTop: '0.5rem',
        fontSize: '0.9rem',
        textAlign: 'center',
        color: 'var(--ifm-color-content-secondary, #606770)'
      }}
    >
      {helpText}
    </div>
  ) : null;

  return (
    <div className={`image-wrapper ${className}`} style={{ width, margin: '2rem auto' }}>
        <img 
          src={src} 
          alt={alt}
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            display: 'block'
          }}
        />
      {HelpText}
    </div>
  );
};

export default Image;
