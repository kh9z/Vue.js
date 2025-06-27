import { createI18n } from 'vue-i18n';
import en from './en';
import uk from './uk';

const messages = {
  en,
  uk,
};

const i18n = createI18n({
  locale: 'uk',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
