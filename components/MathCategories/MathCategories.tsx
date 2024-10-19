import Link from 'next/link';

import TextButton from '../TextButton/TextButton';
import { ELang } from '@models/types';
import { getCatFromMap } from '@/libs/exercises/math';
import { categoriesMap } from '@/models/math/math.model';
import { EExerciseCategories } from '@/models/math/types';
import LazyAppearing from '../intersection/LazyAppearing';

const MathCategories = ({ lang }: { lang: ELang }) => {
  return (
    <LazyAppearing>
      <div className="max-w-screen-lg flex flex-wrap justify-center content-around gap-x-10 gap-y-14">
        {[...categoriesMap.keys()]
          .filter((c) => c !== EExerciseCategories['level'])
          .map((catSlug) => (
            <Link href={`/${lang}/math/category/${catSlug}`} key={catSlug}>
              <TextButton isLink>{getCatFromMap(catSlug, lang).description}</TextButton>
            </Link>
          ))}
      </div>
    </LazyAppearing>
  );
};

export default MathCategories;
