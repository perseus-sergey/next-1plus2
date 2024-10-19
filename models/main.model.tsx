export const MAIN_URL = 'https://www.1plus2.fun';

// ================================================
// change static imports to dynamic
// change breadcrumbs
// repeater - remove ... after generated tasks
// add aria-label and titles` to all buttons
// translate all
// add logo
// make footer with about-us and all pages
// split all modules
// seolinks
// hangman generated tasks must includes 1 word
// make cron script ai add to db hangman tasks 50 tasks per day
// ================================================

export enum ESegments {
  DYNAMIC_LANG = 'lang',
  ABOUT = 'about-us',
  HANGMAN = 'hangman',
  MATH = 'math',
  REPEATER = 'repeater',
  MATH_CATEGORY = 'category',
  DYNAMIC_CATEGORY = 'cat',
  DYNAMIC_MAX_NUM = 'maxNum',
  MATH_LEVEL = 'level',
}

export const DEFAULT_META_OG = {
  siteName: '1+2 Fun',
  type: 'website',
  authors: ['1+2 Fun'],
};
