import LanguageToggle from '../LanguageToggle/LanguageToggle';
import FavIcon from '../FavIcon/FavIcon';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { useTranslation } from 'react-i18next';

const Header = ({ onSearchChange, languageOptions, activeLanguage, onChangeLanguage }) => {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 px-4 flex items-center justify-between border-b border-primary/30 bg-linear-to-l from-brand-light to-brand-bg shadow-[0_1px_12px_rgba(15,23,42,0.06)] sm:px-8 lg:px-24">
      <div className="flex-shrink-0">
        <Link to="/" aria-label={t('header.logoAriaLabel')}>
          <img 
            src="/LogoReactGamesCompleto.png" 
            alt={t('header.logoAlt')} 
            className="h-16 w-auto object-contain md:h-20"
          />
        </Link>
      </div>

      <div className="flex-grow max-w-md mx-8">
        <SearchBox
          onSearchChange={onSearchChange}
          placeholder={t('header.search.placeholder')}
          ariaLabel={t('header.search.ariaLabel')}
          clearAriaLabel={t('header.search.clearAriaLabel')}
        />
      </div>

      <div className="flex items-center gap-6">
        <nav aria-label={t('header.favoritesAriaLabel')}>
        <FavIcon variant="nav" to="/favorites" ariaLabel={t('header.favoritesAriaLabel')} /> 
        </nav>

        <LanguageToggle
          options={languageOptions}
          activeLanguage={activeLanguage}
          onChangeLanguage={onChangeLanguage}
        />

      </div>

    </header>
  );
};

export default Header;