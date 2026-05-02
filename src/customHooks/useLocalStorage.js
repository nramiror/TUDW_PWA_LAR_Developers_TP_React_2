import { useEffect, useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return typeof initialValue === 'function' ? initialValue() : initialValue;
      }

      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.warn(`No se pudo leer localStorage para la clave "${key}":`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`No se pudo guardar localStorage para la clave "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
