import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from './translations/en/common.json';
import goodnessEN from './translations/en/goodness.json';
import homepageEN from './translations/en/homepage.json';
import mineralsEN from './translations/en/minerals.json';
import productsEN from './translations/en/products.json';
import recipesEN from './translations/en/recipes.json';
import usersEN from './translations/en/users.json';

import commonPL from './translations/pl/common.json';
import goodnessPL from './translations/pl/goodness.json';
import homepagePL from './translations/pl/homepage.json';
import mineralsPL from './translations/pl/minerals.json';
import productsPL from './translations/pl/products.json';
import recipesPL from './translations/pl/recipes.json';
import usersPL from './translations/pl/users.json';

const resources = {
  en: {
    common: commonEN,
    goodness: goodnessEN,
    homepage: homepageEN,
    minerals: mineralsEN,
    products: productsEN,
    recipes: recipesEN,
    users: usersEN,
  },
  pl: {
    common: commonPL,
    goodness: goodnessPL,
    homepage: homepagePL,
    minerals: mineralsPL,
    products: productsPL,
    recipes: recipesPL,
    users: usersPL,
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
