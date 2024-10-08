import enSectionsData from './contentrain/sections/en.json';
import trSectionData from './contentrain/sections/tr.json';

import type { TSection } from './types';
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en', // Varsayılan dil
  messages: {
    en: {
      sections: enSectionsData as TSection[],
      menu: {
        home: 'Home',
        services: 'Services',
        process: 'Process',
        technologies: 'Technologies',
        works: 'Works',
      },
    },
    tr: {
      sections: trSectionData as TSection[],
      menu: {
        home: 'Ana Sayfa',
        services: 'Hizmetler',
        process: 'Süreç',
        technologies: 'Teknolojiler',
        works: 'Çalışmalar',
      },
    }
  }
}));
