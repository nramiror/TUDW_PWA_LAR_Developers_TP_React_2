import LanguageToggle from '../LanguageToggle/LanguageToggle';
import FavIcon from '../FavIcon/FavIcon';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import { useTranslation } from 'react-i18next';
import LogIcon from '../LogIcon/LogIcon';
import Modal from '../Modal/Modal';
import { useState, useEffect } from 'react';

const headerStyles = {
  container: 'fixed top-0 left-0 right-0 z-50 w-full h-20 px-4 flex items-center justify-between border-b border-primary/30 bg-linear-to-l from-brand-light to-brand-bg shadow-[0_1px_12px_rgba(15,23,42,0.06)] sm:px-8 lg:px-24',
  logo: 'flex-shrink-0',
  logoImg: 'h-16 w-auto object-contain md:h-20',
  searchContainer: 'flex-grow max-w-md mx-8',
  rightSection: 'flex items-center gap-6',
  nav: 'flex items-center',
};

const Header = ({ onSearchChange, languageOptions, activeLanguage, onChangeLanguage }) => {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userSession');
      setIsLoggedIn(false);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <header className={headerStyles.container}>
      <div className={headerStyles.logo}>
        <Link to="/" aria-label={t('header.logoAriaLabel')}>
          <img
            src="/LogoReactGamesCompleto.png"
            alt={t('header.logoAlt')}
            className={headerStyles.logoImg}
          />
        </Link>
      </div>

      <div className={headerStyles.searchContainer}>
        <SearchBox
          onSearchChange={onSearchChange}
          placeholder={t('header.search.placeholder')}
          ariaLabel={t('header.search.ariaLabel')}
          clearAriaLabel={t('header.search.clearAriaLabel')}
        />
      </div>

      <div className={headerStyles.rightSection}>
        <nav aria-label={t('header.favoritesAriaLabel')} className={headerStyles.nav}>
          <FavIcon variant="nav" to="/favorites" ariaLabel={t('header.favoritesAriaLabel')} />
        </nav>

        <LogIcon isLoggedIn={isLoggedIn} onClick={handleAuthClick} />

        <LanguageToggle
          options={languageOptions}
          activeLanguage={activeLanguage}
          onChangeLanguage={onChangeLanguage}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-primary">Bienvenido a ReactGames</h2>
          <p className="mb-6 text-sm text-secondary">Ingresá tu email y contraseña para continuar.</p>

          
        </div>
      </Modal>

    </header >
  );
};

export default Header;