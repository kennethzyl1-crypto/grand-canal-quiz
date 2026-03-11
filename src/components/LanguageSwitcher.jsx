import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-5 right-5 z-10">
      <button 
        onClick={() => changeLanguage('zh')} 
        disabled={i18n.language === 'zh'}
        className="px-3 py-1 text-gray-500 hover:text-black disabled:text-black font-semibold transition-colors duration-300"
      >
        中文
      </button>
      <span className="text-gray-400">|</span>
      <button 
        onClick={() => changeLanguage('en')} 
        disabled={i18n.language === 'en'}
        className="px-3 py-1 text-gray-500 hover:text-black disabled:text-black font-semibold transition-colors duration-300"
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;