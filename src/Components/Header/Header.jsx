import LanguageToggle from '../LanguageToggle/LanguageToggle';
import FavIcon from '../FavIcon/FavIcon';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
const Header = ({ onSearchChange, languageOptions, activeLanguage, onChangeLanguage }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 px-4 flex items-center justify-between border-b border-primary/30 bg-linear-to-l from-brand-light to-brand-bg shadow-[0_1px_12px_rgba(15,23,42,0.06)] sm:px-8 lg:px-24">
      <div className="flex-shrink-0">
        <Link to="/" aria-label="Ir al inicio">
          <img 
            src="/LogoReactGamesCompleto.png" 
            alt="ReactGames Logo" 
            className="h-16 w-auto object-contain md:h-20"
          />
        </Link>
      </div>

      {/*SEARCH BOX */}
      <div className="flex-grow max-w-md mx-8">
        <SearchBox onSearchChange={onSearchChange} />
      </div>

      {/*ACCIONES*/}
      <div className="flex items-center gap-6">
        <nav aria-label="Favoritos">
        <FavIcon variant="nav" to="/favorites" ariaLabel="Ir a favoritos" /> 
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