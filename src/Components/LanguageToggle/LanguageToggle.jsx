import { useLanguagePreference } from '../../customHooks/useLanguagePreference';

const LanguageToggle = () => {
  const {
    isSpanish,
    isEnglish,
    changeLanguage,
  } = useLanguagePreference();

  return (
    <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 border border-primary/20 shadow-sm">
      <button
        type="button"
        onClick={() => changeLanguage('es')}
        aria-pressed={isSpanish}
        aria-label="Cambiar idioma a Español"
        className={`px-4 py-1.5 text-xs font-bold font-instrument rounded-full transition-all duration-300 cursor-pointer ${
          isSpanish ? 'bg-secondary text-white shadow-md' : 'text-secondary/40 hover:text-secondary'
        }`}
      >
        ES
      </button>

      <button
        type="button"
        onClick={() => changeLanguage('en')}
        aria-pressed={isEnglish}
        aria-label="Cambiar idioma a English"
        className={`px-4 py-1.5 text-xs font-bold font-instrument rounded-full transition-all duration-300 cursor-pointer ${
          isEnglish ? 'bg-secondary text-white shadow-md' : 'text-secondary/40 hover:text-secondary'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;