import LanguageToggle from '../LanguageToggle/LanguageToggle';
import FavIcon from '../FavIcon/FavIcon';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full h-20 px-8 flex items-center justify-between border-b border-[#829AB1]/30 bg-[linear-gradient(to_left,#E2F3FF_0%,#FFFFFF_100%)] shadow-[0_1px_12px_rgba(15,23,42,0.06)]">
      
      {/* LOGO */}
      <div className="flex-shrink-0">
        <Link to="/" aria-label="Ir al inicio">
          <img 
            src="/LogoReactGamesCompleto.png" 
            alt="ReactGames Logo" 
            className="h-16 w-auto object-contain md:h-20"
          />
        </Link>
      </div>

      {/* CENTRO: SEARCH BOX */}
      <div className="flex-grow max-w-md mx-8">
        {/* Componente <SearchBox /> */}
       
      </div>

      {/*ACCIONES*/}
      <div className="flex items-center gap-6">
        <nav aria-label="Favoritos">
        <FavIcon variant="nav" to="/favorites" ariaLabel="Ir a favoritos" /> 
        </nav>

        <LanguageToggle />

      </div>

    </header>
  );
};

export default Header;