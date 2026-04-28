import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslation from './locales/es/Translation.json';
import enTranslation from './locales/en/Translation.json';

const resources = {
  es: {
    translation: esTranslation
  },
  en: {
    translation: enTranslation
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
