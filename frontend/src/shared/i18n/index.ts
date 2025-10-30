import type { InitOptions, Resource } from 'i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en_auth from './locales/en/auth.json';
import en_common from './locales/en/common.json';
import ru_auth from './locales/ru/auth.json';
import ru_common from './locales/ru/common.json';

export const SUPPORTED_LANGS = ['en', 'ru'] as const;
export type SupportedLng = (typeof SUPPORTED_LANGS)[number];
export const FALLBACK_LNG: SupportedLng = 'en';

const resources = {
    en: { common: en_common, auth: en_auth },
    ru: { common: ru_common, auth: ru_auth },
};

const options = {
    resources: resources as Resource,
    fallbackLng: FALLBACK_LNG,
    supportedLngs: [...SUPPORTED_LANGS],
    ns: ['common', 'auth'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        lookupQuerystring: 'lng',
        caches: ['localStorage', 'cookie'],
    },
    returnObjects: false,
    returnNull: false,
} as InitOptions;

i18n.use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;
