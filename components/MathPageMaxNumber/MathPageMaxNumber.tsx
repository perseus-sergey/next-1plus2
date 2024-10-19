import { redirect } from 'next/navigation';
import Link from 'next/link';

import KeyboardButton from '../KeyboardButton/KeyboardButton';
import { createMaxNumArray } from '@/libs/utils';
import { categoriesMap } from '@/models/math/math.model';
import { ELang } from '@models/types';
import { ESegments } from '@/models/main.model';
import { EExerciseCategories } from '@/models/math/types';

const { MATH, MATH_CATEGORY, MATH_LEVEL } = ESegments;

const MathPageMaxNumber = ({ lang, cat }: { lang: ELang; cat: EExerciseCategories }) => {
  const catObj = categoriesMap.get(cat);

  if (!catObj) return redirect(`/${lang}/${MATH}/${MATH_CATEGORY}`);

  const getHref = (value: number) =>
    cat === EExerciseCategories['level']
      ? `/${lang}/${MATH}/${MATH_LEVEL}/${value}`
      : `/${lang}/${MATH}/${MATH_CATEGORY}/${cat}/${value}`;

  return (
    <section className="keyboard" data-testid="MathPageMaxNumber">
      <div className="keyboard-line">
        {createMaxNumArray(catObj.exercise).map((value) => (
          <Link href={getHref(value)} key={value}>
            <KeyboardButton value={`${value}`} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MathPageMaxNumber;
