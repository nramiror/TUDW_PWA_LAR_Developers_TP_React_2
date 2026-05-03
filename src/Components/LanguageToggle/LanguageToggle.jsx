const LanguageToggle = ({ options = [], activeLanguage = '', onChangeLanguage }) => {
  const normalizedActiveLanguage = String(activeLanguage);

  return (
    <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 border border-primary/20 shadow-sm">
      {options.map((option) => {
        const isActive = normalizedActiveLanguage.startsWith(option.code);

        return (
          <button
            key={option.code}
            type="button"
            onClick={() => onChangeLanguage(option.code)}
            aria-pressed={isActive}
            aria-label={option.ariaLabel}
            className={`px-4 py-1.5 text-xs font-bold font-instrument rounded-full transition-all duration-300 cursor-pointer ${
              isActive ? 'bg-secondary text-white shadow-md' : 'text-secondary/40 hover:text-secondary'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;