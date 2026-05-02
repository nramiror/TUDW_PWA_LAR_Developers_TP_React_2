
import { useCallback, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import ItemDetail from './Pages/ItemDetail/ItemDetail';
import { useLocalStorage } from './customHooks/useLocalStorage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteGames, setFavoriteGames] = useLocalStorage('favoriteGames', []);

  const favoriteIdSet = useMemo(
    () => new Set(favoriteGames.map((game) => String(game.id))),
    [favoriteGames],
  );

  const favoriteIds = useMemo(() => Array.from(favoriteIdSet), [favoriteIdSet]);

  const handleToggleFavorite = useCallback((game) => {
    if (!game || game.id === undefined || game.id === null) {
      return;
    }

    const gameId = String(game.id);

    setFavoriteGames((prevFavorites) => {
      const exists = prevFavorites.some((fav) => String(fav.id) === gameId);

      if (exists) {
        return prevFavorites.filter((fav) => String(fav.id) !== gameId);
      }

      return [...prevFavorites, { ...game, id: gameId, isFavorite: true }];
    });
  }, [setFavoriteGames]);

  const syncFavoriteGames = useCallback((visibleGames) => {
    if (!Array.isArray(visibleGames) || visibleGames.length === 0) {
      return;
    }

    setFavoriteGames((prevFavorites) => {
      const visibleGamesById = new Map(
        visibleGames.map((game) => [String(game.id), game]),
      );

      let changed = false;
      const nextFavorites = prevFavorites.map((fav) => {
        const updated = visibleGamesById.get(String(fav.id));
        if (!updated) {
          return fav;
        }

        const mergedFavorite = { ...fav, ...updated, id: String(updated.id), isFavorite: true };
        const mergedKeys = Object.keys(mergedFavorite);
        const hasDifferences = mergedKeys.length !== Object.keys(fav).length
          || mergedKeys.some((key) => !Object.is(mergedFavorite[key], fav[key]));

        if (!hasDifferences) {
          return fav;
        }

        changed = true;
        return mergedFavorite;
      });

      return changed ? nextFavorites : prevFavorites;
    });
  }, [setFavoriteGames]);

  const favoritesWithFlag = useMemo(
    () => favoriteGames.map((game) => ({ ...game, isFavorite: true })),
    [favoriteGames],
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header onSearchChange={setSearchQuery} />
      <main className="flex flex-1 items-center justify-center pt-20">
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                searchQuery={searchQuery}
                favoriteIds={favoriteIds}
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
                onToggleFavorite={(gameId) => {
                  const game = favoriteGames.find((fav) => String(fav.id) === String(gameId));
                  if (game) {
                    handleToggleFavorite(game);
                  }
                }}
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
