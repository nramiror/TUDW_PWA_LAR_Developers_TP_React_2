import LenguageToggle from '../LenguageToggle/LenguageToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full h-20 px-8 flex items-center justify-between border-b border-[#829AB1]/30 bg-[linear-gradient(to_left,#E2F3FF_0%,#FFFFFF_100%)] shadow-[0_1px_12px_rgba(15,23,42,0.06)]">
      
      <div className="flex-shrink-0">
        <img 
          src="/LogoReactGamesCompleto.png" 
          alt="ReactGames Logo" 
          className="h-16 w-auto object-contain cursor-pointer md:h-20"
        />
      </div>

      {/* CENTRO: SEARCH BOX */}
      <div className="flex-grow max-w-md mx-8">
        {/* Componente <SearchBox /> */}
       
      </div>

      {/* DERECHA: ACCIONES*/}
      <div className="flex items-center gap-6">
        
        {/* Nav de Favoritos */}
        <nav >
          
        </nav>

        <LanguageToggle />

      </div>

    </header>
  );
};

export default Header;