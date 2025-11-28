'use client';
import { useLanguage } from '@/src/contexts/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
      aria-label={`Switch to ${language === 'id' ? 'English' : 'Indonesian'} language`}
    >
      {/* Indonesia Flag Icon */}
      <div className={`flex items-center ${language === 'id' ? 'opacity-100' : 'opacity-50'}`}>
        <div className="w-6 h-4 bg-red-500 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-white"></div>
        </div>
        <span className="ml-1 text-sm font-medium">ID</span>
      </div>
      
      {/* Toggle Switch */}
      <div className="relative w-10 h-5 bg-gray-300 rounded-full transition-colors duration-300">
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            language === 'id' ? 'left-0.5' : 'left-5.5'
          }`}
        />
      </div>

      {/* English Flag Icon */}
      <div className={`flex items-center ${language === 'en' ? 'opacity-100' : 'opacity-50'}`}>
        <div className="w-6 h-4 bg-blue-600 relative">
          <div className="absolute inset-0 bg-red-600" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
          <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
        </div>
        <span className="ml-1 text-sm font-medium">EN</span>
      </div>
    </button>
  );
}