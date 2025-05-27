import React, { Component, useState, useEffect } from 'react';
import { useTranslation } from '../i18n/index.jsx';

export const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleError = (event) => {
      console.error('ErrorBoundary caught an error:', event.error);
      setHasError(true);
      setError(event.error);
    };

    const handleUnhandledRejection = (event) => {
      console.error('ErrorBoundary caught an unhandled promise rejection:', event.reason);
      setHasError(true);
      setError(new Error(event.reason));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const resetError = () => {
    setHasError(false);
    setError(null);
  };

  if (hasError) {
    if (fallback) {
      return t(fallback);
    }

    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h2 style={titleStyle}>{t('error.title')}</h2>
          <p style={messageStyle}>{t('error.message')}</p>
          <details style={detailsStyle}>
            <summary style={summaryStyle}>{t('error.details')}</summary>
            <pre style={preStyle}>{error?.message || 'Unknown error'}</pre>
          </details>
          <div style={buttonStyle}>
            <button 
              onClick={resetError}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              {t('error.retry')}
            </button>
            <button 
              onClick={() => window.location.reload()}
              style={buttonStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              {t('error.reload')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

// Styles
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  margin: '20px'
};

const contentStyle = {
  textAlign: 'center',
  maxWidth: '500px'
};

const titleStyle = {
  color: '#dc3545',
  marginBottom: '16px',
  fontSize: '24px'
};

const messageStyle = {
  color: '#6c757d',
  marginBottom: '20px',
  fontSize: '16px'
};

const detailsStyle = {
  textAlign: 'left',
  margin: '20px 0',
  padding: '16px',
  backgroundColor: '#f1f3f4',
  borderRadius: '4px',
  border: '1px solid #dee2e6'
};

const summaryStyle = {
  cursor: 'pointer',
  fontWeight: 'bold',
  marginBottom: '8px'
};

const preStyle = {
  backgroundColor: '#fff',
  padding: '12px',
  borderRadius: '4px',
  border: '1px solid #dee2e6',
  fontSize: '12px',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word'
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.2s'
};

export default ErrorBoundary