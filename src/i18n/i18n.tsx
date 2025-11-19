import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// import home_en from './src/locales/en/home.json';
import HOME_EN from '../locales/en/home.json'
import HOME_VI from '../locales/vi/home.json'
import LanguageDetector from 'i18next-browser-languagedetector'
export const locales = {
  EN: 'English',
  VI: 'Tiếng Việt'
}
export const resources = {
  VI: {
    home: HOME_VI
  },
  EN: {
    home: HOME_EN
  }
}
export const defaultNS = 'home'
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    ns: ['home'],
    defaultNS,
    // preload: ['VI'],
    detection: {
      order: ['cookie', 'querystring', 'localStorage'],
      lookupCookie: 'seasoftservice',
      caches: ['cookie'] // chon cookie là language chinh
    },
    fallbackLng: 'VI',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })
