import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from './useLocalStorage';

export const useLanguagePreference = () => {
  const { i18n } = useTranslation();
  const [preferredLanguage, setPreferredLanguage] = useLocalStorage('language', 'es');

  const currentLanguage = i18n.language ?? 'es';

  useEffect(() => {
    if (!preferredLanguage || i18n.language?.startsWith(preferredLanguage)) {
      return;
    }

    i18n.changeLanguage(preferredLanguage);
  }, [preferredLanguage, i18n]);

  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
    setPreferredLanguage(lng);
  }, [i18n, setPreferredLanguage]);

  return {
    currentLanguage,
    changeLanguage,
  };
};