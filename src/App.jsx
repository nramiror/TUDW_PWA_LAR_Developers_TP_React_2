
import { useCallback, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import ItemDetail from './Pages/ItemDetail/ItemDetail';
import { useFavoriteGames } from './customHooks/useFavoriteGames';
import { useLanguagePreference } from './customHooks/useLanguagePreference';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const {
    favoriteIds,
    favoritesWithFlag,
    handleToggleFavorite,
    handleToggleFavoriteById,
    syncFavoriteGames,
  } = useFavoriteGames();
  const {
    currentLanguage,
    changeLanguage,
  } = useLanguagePreference();
  const navigate = useNavigate();

  const languageOptions = [
    { code: 'es', label: 'ES', ariaLabel: t('header.language.es') },
    { code: 'en', label: 'EN', ariaLabel: t('header.language.en') },
  ];

  const handleViewDetails = useCallback((gameOrId) => {
    if (gameOrId === undefined || gameOrId === null) {
      return;
    }

    if (typeof gameOrId === 'object') {
      navigate(`/item/${gameOrId.id}`, { state: { item: gameOrId } });
      return;
    }

    navigate(`/item/${gameOrId}`);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header
        onSearchChange={setSearchQuery}
        languageOptions={languageOptions}
        activeLanguage={currentLanguage}
        onChangeLanguage={changeLanguage}
      />
      <main className="flex w-full flex-1 items-start justify-center pt-20">
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                searchQuery={searchQuery}
                favoriteIds={favoriteIds}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavorite}
                onSyncFavoriteGames={syncFavoriteGames}
              />
            )}
          />
          <Route
            path="/favorites"
            element={(
              <Favorites
                games={favoritesWithFlag}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavoriteById}
              />
            )}
          />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
