'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('id'); // default SSR
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('preferred-language');
    if (saved) {
      setLanguage(saved);
    }
    setIsReady(true);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    setLanguage(newLanguage);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('preferred-language', newLanguage);
    }
  };

  if (!isReady) {
    // Bisa return null atau skeleton kecil; yang penting SSR & client sama.
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
