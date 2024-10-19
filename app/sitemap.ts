import { MetadataRoute } from 'next';
import { DEFAULT_LANG, ELang } from '@/models/types';
import { getFormattedDateStrYearFirst } from '@/libs/dates/dates';
import { ESegments, MAIN_URL } from '@/models/main.model';
import { categoriesMap } from '@/models/math/math.model';
import { EExerciseCategories } from '@/models/math/types';

const BASE = process.env.BASE_URL || MAIN_URL;
const { ua, en } = ELang;
const { REPEATER, HANGMAN, MATH, MATH_CATEGORY, MATH_LEVEL, ABOUT } = ESegments;

type TChangeFrequency = 'always' | 'never' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

interface IItemData {
  startPath: (ESegments | EExerciseCategories | number | '')[];
  changeFrequency?: TChangeFrequency;
  addedPath?: string;
  cpuIsDate?: boolean;
}

interface IItemsData extends IItemData {
  itemList: { slug: string }[];
}

const getSiteMapItem = ({ startPath, changeFrequency = 'never' }: IItemData) => {
  const endPath = startPath[0] === '' ? '' : `/${startPath.join('/')}`;

  return {
    url: `${BASE}/${DEFAULT_LANG}${endPath}`,
    lastModified: new Date(),
    changeFrequency,
    alternates: {
      languages: {
        en: `${BASE}/${en}${endPath}`,
        uk: `${BASE}/${ua}${endPath}`,
      },
    },
  };
};

const getSiteMapItemList = ({
  startPath,
  itemList,
  changeFrequency = 'never',
  addedPath,
  cpuIsDate,
}: IItemsData) =>
  itemList.map((item) => {
    const endPath = `${startPath.join('/')}/${item.slug}${addedPath ? `/${addedPath}` : ''}`;

    return {
      url: `${BASE}/${DEFAULT_LANG}/${endPath}`,
      lastModified: cpuIsDate ? getFormattedDateStrYearFirst(item.slug) : new Date(),
      changeFrequency,
      alternates: {
        languages: {
          en: `${BASE}/${en}/${endPath}`,
          uk: `${BASE}/${ua}/${endPath}`,
        },
      },
    };
  });

export default function sitemap(): MetadataRoute.Sitemap {
  const catLevelObj = categoriesMap.get(EExerciseCategories.level);
  const levelNum = catLevelObj ? catLevelObj.exercise.max : 100;

  const mathCatNumList = [...categoriesMap.entries()].slice(0, -1).map(([catSlug, catObj]) =>
    getSiteMapItem({
      startPath: [MATH, MATH_CATEGORY, catSlug, catObj.exercise.max],
      changeFrequency: 'monthly',
    })
  );

  return [
    getSiteMapItem({ startPath: [''], changeFrequency: 'monthly' }),
    getSiteMapItem({ startPath: [HANGMAN], changeFrequency: 'monthly' }),
    getSiteMapItem({ startPath: [REPEATER], changeFrequency: 'monthly' }),
    getSiteMapItem({ startPath: [ABOUT], changeFrequency: 'monthly' }),
    getSiteMapItem({ startPath: [MATH], changeFrequency: 'monthly' }),

    ...getSiteMapItemList({
      startPath: [MATH],
      itemList: [{ slug: MATH_CATEGORY }, { slug: MATH_LEVEL }],
      changeFrequency: 'monthly',
    }),

    getSiteMapItem({ startPath: [MATH, MATH_LEVEL, levelNum], changeFrequency: 'monthly' }),

    ...getSiteMapItemList({
      startPath: [MATH, MATH_CATEGORY],
      itemList: [...categoriesMap.keys()].slice(0, -1).map((catSlug) => ({ slug: catSlug })),
      changeFrequency: 'monthly',
    }),

    ...mathCatNumList,
  ];
}
