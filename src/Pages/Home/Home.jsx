import { useEffect, useMemo } from 'react';
import Alert from '../../Components/Alert/Alert';
import Loader from '../../Components/Loader/Loader';
import List from '../../Components/List/List';
import Title from '../../Components/Title/Title';
import { useInfiniteScroll } from '../../customHooks/useInfiniteScroll';
import { getBoardGames } from '../../services/boardgames';

const Home = ({
  searchQuery = '',
  onViewDetails,
  onToggleFavorite,
  favoriteIds = [],
  onSyncFavoriteGames,
}) => {
  const {
    items: games,
    loading,
    hasMore,
    observerTarget,
    search,
    setSearch,
  } = useInfiniteScroll(getBoardGames, { pageSize: 5 });

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery, setSearch]);

  useEffect(() => {
    onSyncFavoriteGames?.(games);
  }, [games, onSyncFavoriteGames]);

  const favoriteIdSet = useMemo(
    () => new Set(favoriteIds.map((id) => String(id))),
    [favoriteIds],
  );

  const gamesWithFavorites = useMemo(
    () => games.map((game) => ({ ...game, isFavorite: favoriteIdSet.has(String(game.id)) })),
    [games, favoriteIdSet],
  );

  const showMessage = gamesWithFavorites.length === 0 && !loading;
  const alertMessage = (
    <Alert
      type="info"
      message={
        search
          ? `No encontramos juegos que empiecen con "${search}".`
          : 'Todavía no hay juegos para mostrar.'
      }
    />
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-10 pt-8 sm:px-8 lg:px-24">
      <div className="w-full pl-3 text-left sm:pl-4">
        <Title level={2} className="text-left">
          Bienvenido/a a ReactGames
        </Title>
        <p className="mt-2 font-comfortaa text-sm text-secondary">
          El lugar indicado para elegir tu próximo juego de mesa
        </p>
      </div>

      {showMessage ? (
        <div className="w-full">
          {alertMessage}
        </div>
      ) : (
        <List
          items={gamesWithFavorites}
          onViewDetails={onViewDetails}
          onToggleFavorite={(gameId) => {
            const selectedGame = gamesWithFavorites.find((game) => String(game.id) === String(gameId));
            if (selectedGame) {
              onToggleFavorite?.(selectedGame);
            }
          }}
          className="w-full"
        />
      )}

      {loading && games.length > 0 ? (
        <div className="w-full">
          <Loader message='Cargando juegos...'/>
        </div>
      ) : null}

      <div ref={observerTarget} className="h-1 w-full" aria-hidden="true" />
    </div>
  );
};

export default Home;
