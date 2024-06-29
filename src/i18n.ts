import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from './translations/en/common.json';
import homepageEN from './translations/en/homepage.json';
import productsEN from './translations/en/products.json';
import recipesEN from './translations/en/recipes.json';

import commonPL from './translations/pl/common.json';
import homepagePL from './translations/pl/homepage.json';
import productsPL from './translations/pl/products.json';
import recipesPL from './translations/pl/recipes.json';

const resources = {
  en: {
    common: commonEN,
    homepage: homepageEN,
    products: productsEN,
    recipes: recipesEN,
  },
  pl: {
    common: commonPL,
    homepage: homepagePL,
    products: productsPL,
    recipes: recipesPL,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: [
        'querystring',
        'cookie',
        'localStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['localStorage', 'cookie'],
    },
    debug: true, // todo Set to false in production
    interpolation: {
      escapeValue: false,
    },
    ns: 'common',
    defaultNS: 'common',
    fallbackNS: 'common',
  });

export default i18n;
