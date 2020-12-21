import Vue from 'vue'
import VueI18n from 'vue-i18n';
import en from './locales/en.json'
import { defaultLocale , defaultLocaleFallback } from '../constants/config.js';

Vue.use(VueI18n);

const messages = { en: en };
const i18n = new VueI18n({
    locale: defaultLocale || 'en',
    fallbackLocale: defaultLocaleFallback || 'en',
    messages,
});

export default i18n;