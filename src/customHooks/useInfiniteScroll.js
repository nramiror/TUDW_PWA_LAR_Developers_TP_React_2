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

  const requestIdRef = useRef(0);
  const controllerRef = useRef(null);
  const isFirstLoadRef = useRef(true);

  const loadItems = useCallback(async (pageNum, searchQuery) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;


    requestIdRef.current += 1;
    const myRequestId = requestIdRef.current;

    setLoading(true);
    try {
      const data = await fetchFunction(pageNum, searchQuery, pageSize, controller.signal);

   
      if (myRequestId !== requestIdRef.current) return;

  
      if (data.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }


      setItems(prev => (pageNum === 1 ? data : [...prev, ...data]));

   
      if (pageNum === 1) {
        isFirstLoadRef.current = false;
      }
    } catch (error) {
  
      if (error.name === 'AbortError') return;

      console.error('Error cargando datos:', error);
  
      if (myRequestId === requestIdRef.current) {
        setHasMore(false);
      }
    } finally {

      if (myRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [fetchFunction, pageSize]);


  useEffect(() => {
    isFirstLoadRef.current = true;
    setPage(1);
    setItems([]);
    loadItems(1, search);
  }, [search, loadItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore && !isFirstLoadRef.current) {
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

  useEffect(() => {
    if (page > 1) {
      loadItems(page, search);
    }
  }, [page, search, loadItems]);

  const resetScroll = useCallback(() => {
    isFirstLoadRef.current = true;
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
