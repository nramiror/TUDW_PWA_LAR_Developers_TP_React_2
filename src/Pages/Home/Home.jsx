import { useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Form from '../../Components/Form/Form';
import Loader from '../../Components/Loader/Loader';
import List from '../../Components/List/List';
import Title from '../../Components/Title/Title';
import { useInfiniteScroll } from '../../customHooks/useInfiniteScroll';
import { getBoardGames, createBoardGameInDB } from '../../services/boardgames';
import { useAuth } from '../../context/AuthContext';
import Button from '../../Components/Button/Button';
import Modal from '../../Components/Modal/Modal';

import {
  createFavoriteIdSet,
  enrichGamesWithFavorites,
  findGameById,
  getEmptyStateMessage,
  shouldShowLoader,
} from '../../utils/home/homeUtils';

const Home = ({
  searchQuery = '',
  onViewDetails,
  onToggleFavorite,
  favoriteIds = [],
  onSyncFavoriteGames,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'es';
  const { user } = useAuth();

  const fetchGamesWithLanguage = useCallback(
    (page, searchTerm, limit, signal) => {
      return getBoardGames(page, searchTerm, limit, currentLanguage, signal);
    },
    [currentLanguage]
  );

  const {
    items: games,
    loading,
    hasMore,
    observerTarget,
    search,
    setSearch,
    resetScroll,
  } = useInfiniteScroll(fetchGamesWithLanguage, { pageSize: 15 });

  const handleCreateGame = async (formData) => {
    try {
      const response = await createBoardGameInDB(formData);

      if (response.success) {
        setIsModalOpen(false);
        console.log("¡Juego creado exitosamente!", response);

        resetScroll();
      }
      else{
        alert(`Error del servidor: ${response.message}`);
      }
    } catch (error) {
      console.error("Error al guardar el juego:", error);
      alert("Hubo un problema al crear el juego. Revisá la consola.");
    }
  };

  const homeTitle = t('home.title');
  const homeDescription = t('home.description');
  const loaderMessage = t('home.loading');

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery, setSearch]);

  useEffect(() => {
    onSyncFavoriteGames?.(games);
  }, [games, onSyncFavoriteGames]);

  const favoriteIdSet = useMemo(
    () => createFavoriteIdSet(favoriteIds),
    [favoriteIds],
  );

  const gamesWithFavorites = useMemo(
    () => enrichGamesWithFavorites(games, favoriteIdSet),
    [games, favoriteIdSet],
  );

  const emptyMessage = getEmptyStateMessage(!!search, search, t);

  const handleOpenCreateForm = () => {
    setIsModalOpen(true);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 pb-10 pt-8 sm:px-8 lg:px-24">
      <div className="w-full pl-3 text-left sm:pl-4">
        <Title level={2} className="text-left">
          {homeTitle}
        </Title>
        <p className="mt-2 font-comfortaa text-sm text-secondary">
          {homeDescription}
        </p>
      </div>

      <List
        items={gamesWithFavorites}
        onViewDetails={onViewDetails}
        userSession={user}
        onToggleFavorite={(gameId) => {
          const selectedGame = findGameById(gamesWithFavorites, gameId);
          if (selectedGame) {
            onToggleFavorite?.(selectedGame);
          }
        }}
        emptyMessage={emptyMessage}
        className="w-full"
      />

      {shouldShowLoader(loading, games) && (
        <div className="w-full">
          <Loader message={loaderMessage} />
        </div>
      )}

      <div ref={observerTarget} className="h-1 w-full" aria-hidden="true" />
      { }
      {isAdmin && (
        <Button
          onClick={handleOpenCreateForm}
          aria-label="Agregar nuevo juego de mesa"
          className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-5xl font-bold text-white shadow-lg transition-all hover:scale-110 active:scale-95 z-50 focus:outline-none focus:ring-2 focus:ring-secondary/50"
        >
          ＋
        </Button>
      )}
      { }
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-2 text-left">
            <Form
              onCancel={() => setIsModalOpen(false)}
              onSave={handleCreateGame}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
