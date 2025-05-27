// src/i18n/index.js
import { createContext, useContext, useState } from 'react';

// Traduzioni
const translations = {
  it: {
    // Errori
    'error.title': 'Oops! Qualcosa è andato storto',
    'error.message': 'Si è verificato un errore inaspettato nell\'applicazione.',
    'error.details': 'Dettagli errore',
    'error.retry': 'Riprova',
    'error.reload': 'Ricarica pagina',
    
    // Loading
    'loading.default': 'Caricamento...',
    'loading.app': 'Inizializzazione applicazione...',
    'loading.module': 'Caricamento modulo...',
    
    // Navigazione
    'nav.home': 'Home',
    'nav.expenses': 'Spese',
    'nav.groups': 'Gruppi',
    'nav.profile': 'Profilo',
    
    // Generale
    'app.title': 'Gestore Spese di Gruppo',
    'common.save': 'Salva',
    'common.cancel': 'Annulla',
    'common.delete': 'Elimina',
    'common.edit': 'Modifica',
    'common.add': 'Aggiungi',

    'home.transactionapp.fallback': 'Applicazione transazioni non disponibile',
    'home.groupapp.fallback': 'Gestione gruppi non disponibile',
  },
  en: {
    // Errors
    'error.title': 'Oops! Something went wrong',
    'error.message': 'An unexpected error occurred in the application.',
    'error.details': 'Error details',
    'error.retry': 'Retry',
    'error.reload': 'Reload page',
    
    // Loading
    'loading.default': 'Loading...',
    'loading.app': 'Initializing application...',
    'loading.module': 'Loading module...',
    
    // Navigation
    'nav.home': 'Home',
    'nav.expenses': 'Expenses',
    'nav.groups': 'Groups',
    'nav.profile': 'Profile',
    
    // General
    'app.title': 'Group Expenses Manager',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',

    'home.transactionapp.fallback': 'No transactions app available',
    'home.groupapp.fallback': 'No groups management app available',
  }
};

// Context per l'internazionalizzazione
const I18nContext = createContext();

// Provider component
export const I18nProvider = ({ children, defaultLanguage = 'en' }) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const t = (key, params = {}) => {
    let translation = translations[language]?.[key] || translations['en']?.[key] || key;
    
    // Sostituisce i parametri nella traduzione (es: "Hello {name}" con params = {name: 'John'})
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// Hook per usare l'internazionalizzazione
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

// Componente per il selettore di lingua
export const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages } = useTranslation();

  return (
    <select 
      value={language} 
      onChange={(e) => changeLanguage(e.target.value)}
      style={selectorStyle}
    >
      <option value="en">English</option>
      <option value="it">Italiano</option>
    </select>
  );
};

const selectorStyle = {
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: 'white',
  fontSize: '14px'
};