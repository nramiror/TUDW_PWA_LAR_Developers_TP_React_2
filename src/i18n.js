import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import esTranslation from './locales/es/Translation.json'
import enTranslation from './locales/en/Translation.json'

const resources = {
  es: {
    translation: esTranslation
  },
  en: {
    translation: enTranslation
  }
};

const defaultLanguage = 'es';
const supportedLanguages = Object.keys(resources);

const getInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }
  try {
    const storedLanguage = window.localStorage.getItem('language');
    if (supportedLanguages.includes(storedLanguage)) {
      return storedLanguage;
    }
  } catch (error) {
    return defaultLanguage;
  }
  return defaultLanguage;
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
