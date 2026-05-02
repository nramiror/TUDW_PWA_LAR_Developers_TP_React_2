import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from '../../customHooks/useLocalStorage';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [preferredLanguage, setPreferredLanguage] = useLocalStorage('language', 'es');

  useEffect(() => {
    if (!preferredLanguage || i18n.language?.startsWith(preferredLanguage)) {
      return;
    }

    i18n.changeLanguage(preferredLanguage);
  }, [preferredLanguage, i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setPreferredLanguage(lng);
  };

  const currentLanguage = i18n.language ?? 'es';

  return (
    <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 border border-primary/20 shadow-sm">
      <button
        type="button"
        onClick={() => changeLanguage('es')}
        aria-pressed={currentLanguage.startsWith('es')}
        aria-label="Cambiar idioma a Español"
        className={`px-4 py-1.5 text-xs font-bold font-instrument rounded-full transition-all duration-300 cursor-pointer ${
          currentLanguage.startsWith('es') ? 'bg-secondary text-white shadow-md' : 'text-secondary/40 hover:text-secondary'
        }`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => changeLanguage('en')}
        aria-pressed={currentLanguage.startsWith('en')}
        aria-label="Cambiar idioma a English"
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