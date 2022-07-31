const i18n = require('i18n');
i18n.configure({
    defaultLocale: 'en',
    directory: './locales',
    api: {
      __: 'translate',
      __n: 'translateN',
    },
  });
  
  module.exports = i18n;