/**
 * Basic Setting Variables Define
 */
import {version} from '../../package.json';
export const BaseSetting = {
  name: 'FelixPro',
  displayName: 'FelixPro',
  appVersion: version,
  defaultLanguage: 'en',
  languageSupport: [
    'en',
    'vi',
    'ar',
    'da',
    'de',
    'el',
    'fr',
    'he',
    'id',
    'ja',
    'ko',
    'lo',
    'nl',
    'zh',
    'fa',
    'km',
  ],
  resourcesLanguage: {
    en: {
      translation: require('../lang/en.json'),
    },
    vi: {
      translation: require('../lang/vi.json'),
    },
    ar: {
      translation: require('../lang/ar.json'),
    },
    da: {
      translation: require('../lang/da.json'),
    },
    de: {
      translation: require('../lang/de.json'),
    },
    el: {
      translation: require('../lang/el.json'),
    },
    fr: {
      translation: require('../lang/fr.json'),
    },
    he: {
      translation: require('../lang/he.json'),
    },
    id: {
      translation: require('../lang/id.json'),
    },
    ja: {
      translation: require('../lang/ja.json'),
    },
    ko: {
      translation: require('../lang/ko.json'),
    },
    lo: {
      translation: require('../lang/lo.json'),
    },
    nl: {
      translation: require('../lang/nl.json'),
    },
    zh: {
      translation: require('../lang/zh.json'),
    },
    fa: {
      translation: require('../lang/fa.json'),
    },
    km: {
      translation: require('../lang/km.json'),
    },
  },
};
