import { MAIN_URL } from '@/models/main.model';
import { ELang } from '@models/types';
import { MetadataRoute } from 'next';

const BASE_URL = process.env.BASE_URL || MAIN_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...Object.values(ELang).map((lang) => `/${lang}/insert/`)],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
