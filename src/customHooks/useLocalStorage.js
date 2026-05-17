import { useEffect, useRef, useState } from 'react';

const resolveInitialValue = (initialValue) => (
  typeof initialValue === 'function' ? initialValue() : initialValue
);

const readStoredValue = (key, initialValue) => {
  if (typeof window === 'undefined') {
    return resolveInitialValue(initialValue);
  }

  try {
    const item = window.localStorage.getItem(key);

    if (item === null) {
      return resolveInitialValue(initialValue);
    }

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.warn(`No se pudo leer localStorage para la clave "${key}":`, error);
    return resolveInitialValue(initialValue);
  }
};

const serializeValue = (value) => {
  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
};

export const useLocalStorage = (key, initialValue) => {
  const initialStoredValueRef = useRef();

  if (initialStoredValueRef.current === undefined) {
    initialStoredValueRef.current = readStoredValue(key, initialValue);
  }

  const [storedValue, setStoredValue] = useState(initialStoredValueRef.current);
  const lastSerializedValueRef = useRef(serializeValue(initialStoredValueRef.current));
  const previousKeyRef = useRef(key);

  useEffect(() => {
    if (typeof window === 'undefined' || previousKeyRef.current === key) {
      return;
    }

    const nextStoredValue = readStoredValue(key, initialValue);

    previousKeyRef.current = key;
    lastSerializedValueRef.current = serializeValue(nextStoredValue);
    setStoredValue(nextStoredValue);
  }, [key, initialValue]);

  const setValue = (valueOrUpdater) => {
    setStoredValue((previousValue) => {
      const nextValue = typeof valueOrUpdater === 'function'
        ? valueOrUpdater(previousValue)
        : valueOrUpdater;

      if (typeof window !== 'undefined') {
        try {
          const serializedValue = JSON.stringify(nextValue);
          const currentStoredValue = window.localStorage.getItem(key);

          if (
            serializedValue !== lastSerializedValueRef.current
            && serializedValue !== currentStoredValue
          ) {
            window.localStorage.setItem(key, serializedValue);
          }

          lastSerializedValueRef.current = serializedValue;
        } catch (error) {
          console.warn(`No se pudo guardar localStorage para la clave "${key}":`, error);
        }
      }

      return nextValue;
    });
  };

  return [storedValue, setValue];
};
