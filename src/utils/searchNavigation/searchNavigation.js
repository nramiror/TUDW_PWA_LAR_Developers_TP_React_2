/** Maneja la lógica de navegación cuando cambia la búsqueda */
export const handleSearchQueryChange = (
  currentPathname,
  previousSearchQuery,
  currentSearchQuery,
  navigate,
) => {
  const isDetailRoute = currentPathname.startsWith('/boardgames');
  const isNotFoundRoute = currentPathname === '/not-found';
  const searchChanged = previousSearchQuery !== currentSearchQuery;

  if ((isDetailRoute || isNotFoundRoute) && searchChanged) {
    navigate('/', { replace: true });
  }
};

/** Navega a los detalles del juego */
export const navigateToGameDetail = (gameOrId, navigate) => {
  if (gameOrId === undefined || gameOrId === null) {
    return;
  }

  if (typeof gameOrId === 'object') {
    navigate(`/boardgames/${gameOrId.id}`, { state: { item: gameOrId } });
    return;
  }

  navigate(`/boardgames/${gameOrId}`);
};
