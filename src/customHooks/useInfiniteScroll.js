import { useEffect, useState, useRef, useCallback } from 'react';

export const useInfiniteScroll = (
  fetchFunction,
  { initialSearch = "", pageSize = 5 } = {}
) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const observerTarget = useRef(null);

  // Cargar datos
  const loadItems = useCallback(async (pageNum, searchQuery) => {
    setLoading(true);
    try {
      const data = await fetchFunction(pageNum, searchQuery, pageSize);

      // Detectar si hay más datos (si retorna menos de lo esperado)
      if (data.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      // Concatenar con datos anteriores o reemplazar si es primera página
      setItems(prev => (pageNum === 1 ? data : [...prev, ...data]));
    } catch (error) {
      console.error('Error cargando datos:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, pageSize]);

  // Cargar primera página cuando cambia search
  useEffect(() => {
    setPage(1);
    setItems([]);
    loadItems(1, search);
  }, [search, loadItems]);

  // IntersectionObserver para detectar fin de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  // Cargar cuando cambia la página
  useEffect(() => {
    if (page > 1) {
      loadItems(page, search);
    }
  }, [page, search, loadItems]);

  const resetScroll = useCallback(() => {
    setPage(1);
    setItems([]);
    setHasMore(true);
  }, []);

  return {
    items,
    loading,
    hasMore,
    observerTarget,
    search,
    setSearch,
    resetScroll,
    page,
  };
};
