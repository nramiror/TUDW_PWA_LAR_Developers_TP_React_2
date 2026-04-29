import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 border border-primary/20 shadow-sm">
      <button
        onClick={() => changeLanguage('es')}
        className={`px-4 py-1.5 text-xs font-bold font-instrument rounded-full transition-all duration-300 cursor-pointer ${
          currentLanguage.startsWith('es') ? 'bg-secondary text-white shadow-md' : 'text-secondary/40 hover:text-secondary'
        }`}
      >
        ES
      </button>

      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-1.5 text-xs font-bold font-instrument rounded-full transition-all duration-300 cursor-pointer ${
          currentLanguage.startsWith('en') ? 'bg-secondary text-white shadow-md' : 'text-secondary/40 hover:text-secondary'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;