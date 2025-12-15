import React from 'react';

interface VideoProps {
  src: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  helpText?: string;
}

const Video: React.FC<VideoProps> = ({ 
  src, 
  title = 'Video player', 
  width = '100%', 
  height = 'auto',
  className = '',
  helpText
}) => {
  const isDirectFile = /\.(mp4|webm|ogg)$/i.test(src);

  const HelpText = helpText ? (
    <div 
      style={{
        marginTop: '0.5rem',
        fontSize: '0.9rem',
        textAlign: 'center',
        color: 'var(--ifm-color-content-secondary, #606770)'
      }}
    >
      <strong>Video:</strong> {helpText}
    </div>
  ) : null;

  if (isDirectFile) {
    return (
      <div className={`video-wrapper ${className}`} style={{ width, margin: '2rem auto' }}>
        <div className="video-container">
          <video 
            controls 
            style={{ 
              width: '100%', 
              height: '100%', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
          >
            <source src={src} type={`video/${src.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
        </div>
        {HelpText}
      </div>
    );
  }

  // Fallback for YouTube, Vimeo, etc. (iframe)
  return (
    <div className={`video-wrapper ${className}`} style={{ width, margin: '2rem auto' }}>
      <div 
        className="video-container"
        style={{ 
          position: 'relative', 
          paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
          height: 0, 
          overflow: 'hidden', 
          maxWidth: '100%',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <iframe
          src={src}
          title={title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {HelpText}
    </div>
  );
};

export default Video;
