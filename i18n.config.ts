export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en', // Varsayılan dil
  messages: {
    en: {
      menu: {
        home: 'Home',
        services: 'Services',
        process: 'Process',
        technologies: 'Technologies',
        works: 'Works',
      },
    },
    tr: {
      menu: {
        home: 'Ana Sayfa',
        services: 'Hizmetler',
        process: 'Süreç',
        technologies: 'Teknolojiler',
        works: 'Çalışmalar',
      },
    },
  },
}));
