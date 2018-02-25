// translationRunner.js
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
    messagesDirectory: 'src/i18n/',
    translationsDirectory: 'src/i18n/locales/',
    whitelistsDirectory: 'src/i18n/locales/whitelists/',
    languages: ['en', 'es'] // any language you need
});