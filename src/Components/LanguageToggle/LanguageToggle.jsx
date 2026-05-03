import Button from '../Button/Button';

const LanguageToggle = ({ options = [], activeLanguage = '', onChangeLanguage }) => {
  const normalizedActiveLanguage = String(activeLanguage);

  return (
    <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 border border-primary/20 shadow-sm">
      {options.map((option) => {
        const isActive = normalizedActiveLanguage.startsWith(option.code);

        return (
          <Button
            key={option.code}
            type="button"
            onClick={() => onChangeLanguage(option.code)}
            aria-pressed={isActive}
            ariaLabel={option.ariaLabel}
            variant={isActive ? 'secondary' : 'ghost'}
            size="sm"
            className={`!rounded-full !px-4 !py-1.5 text-xs ${
              isActive ? 'shadow-md' : 'text-secondary/40 hover:text-secondary'
            }`}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;