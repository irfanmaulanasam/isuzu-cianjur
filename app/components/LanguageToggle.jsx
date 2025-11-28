'use client';
import { useLanguage } from '@/src/context/languageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 transition-colors text-xs font-medium"
      aria-label={`Switch to ${language === 'id' ? 'English' : 'Indonesian'}`}
      title={`Current: ${language === 'id' ? 'Indonesian' : 'English'}`}
    >
      {language === 'id' ? 'ID' : 'EN'}
    </button>
  );
}