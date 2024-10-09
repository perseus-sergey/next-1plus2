import { ELang } from '@models/types';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...Object.values(ELang).map((lang) => `/${lang}/insert/`)],
    },
  };
}
