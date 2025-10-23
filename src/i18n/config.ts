import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enTranslations, trTranslations } from './translations';

export const languages = {
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
  tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' }
};

const resources = {
  en: { translation: enTranslations },
  tr: { translation: trTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;