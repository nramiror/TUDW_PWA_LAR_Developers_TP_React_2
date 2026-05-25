
import { useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import ItemDetail from './Pages/ItemDetail/ItemDetail';
import NotFound from './Pages/NotFound/NotFound';
import { useFavoriteGames } from './customHooks/useFavoriteGames';
import { useLanguagePreference } from './customHooks/useLanguagePreference';
import { handleSearchQueryChange, navigateToGameDetail } from './utils/searchNavigation/searchNavigation';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const {
    favoriteIds,
    filteredFavoritesWithFlag,
    handleToggleFavorite,
    handleToggleFavoriteById,
    syncFavoriteGames,
  } = useFavoriteGames(searchQuery);
  const {
    currentLanguage,
    changeLanguage,
  } = useLanguagePreference();
  const location = useLocation();
  const navigate = useNavigate();
  const previousSearchQueryRef = useRef(searchQuery);

  useEffect(() => {
    handleSearchQueryChange(
      location.pathname,
      previousSearchQueryRef.current,
      searchQuery,
      navigate,
    );
    previousSearchQueryRef.current = searchQuery;
  }, [location.pathname, navigate, searchQuery]);

  const languageOptions = [
    { code: 'es', label: 'ES', ariaLabel: t('header.language.es') },
    { code: 'en', label: 'EN', ariaLabel: t('header.language.en') },
  ];

  const handleViewDetails = useCallback(
    (gameOrId) => navigateToGameDetail(gameOrId, navigate),
    [navigate],
  );

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
                games={filteredFavoritesWithFlag}
                onViewDetails={handleViewDetails}
                onToggleFavorite={handleToggleFavoriteById}
              />
            )}
          />
          <Route path="/boardgames/:id" element={<ItemDetail />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
