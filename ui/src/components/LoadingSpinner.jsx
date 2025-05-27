import React from 'react';
import { useTranslation } from '../i18n/index.jsx';

export const LoadingSpinner = ({
  size = 'medium',
  color = '#007bff',
  text,
  overlay = false,
  className = '',
  translationKey = 'loading.default'
}) => {
  const { t } = useTranslation();
  const displayText = text || t(translationKey);
  const getSizeStyles = (size) => {
    switch (size) {
      case 'small':
        return { width: '16px', height: '16px' };
      case 'large':
        return { width: '48px', height: '48px' };
      default:
        return { width: '32px', height: '32px' };
    }
  };

  const getTextSizeStyles = (size) => {
    switch (size) {
      case 'small':
        return { fontSize: '14px' };
      case 'large':
        return { fontSize: '18px' };
      default:
        return { fontSize: '16px' };
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(overlay && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999,
      backdropFilter: 'blur(2px)'
    })
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  };

  const spinnerStyle = {
    ...getSizeStyles(size),
    animation: 'spin 1s linear infinite'
  };

  const textStyle = {
    margin: 0,
    fontWeight: 500,
    textAlign: 'center',
    color,
    ...getTextSizeStyles(size)
  };

  return (
    <div className={className} style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={contentStyle}>
        <svg
          style={spinnerStyle}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            style={{ opacity: 0.25 }}
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth="4"
          />
          <path
            style={{ opacity: 0.75 }}
            fill={color}
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {displayText && <p style={textStyle}>{displayText}</p>}
      </div>
    </div>
  );
};

// Componente per loading inline (senza overlay)
export const InlineLoader = (props) => (
  <LoadingSpinner {...props} overlay={false} />
);

// Componente per loading a schermo intero
export const FullScreenLoader = (props) => (
  <LoadingSpinner {...props} overlay={true} />
);

export default LoadingSpinner