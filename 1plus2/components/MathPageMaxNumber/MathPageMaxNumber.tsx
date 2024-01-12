import { ICatNamePageProps } from '@/app/[lang]/math/category/[cat]/page';
// import styles from './MathPageMaxNumber.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import KeyboardButton from '../KeyboardButton/KeyboardButton';
import { createMaxNumArray } from '@/libs/utils';
import { Title } from '../Title/Title';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { EExerciseCategories, categoriesMap } from '@/libs/exercises/math.model';

const MathPageMaxNumber = ({ params }: ICatNamePageProps) => {
  const { cat, lang } = params;
  const catObj = categoriesMap.get(cat);

  if (!catObj) return redirect(`/${lang}/math/category`);
  const getHref = (value: number) =>
    cat === EExerciseCategories['level']
      ? `/${lang}/math/level/${value}`
      : `/${lang}/math/category/${cat}/${value}`;

  return (
    <section className="keyboard" data-testid="MathPageMaxNumber">
      <Title name={getTitleFromMap(EMessageNames.CHOICE_MAX_EXS_NUM, lang)} />

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
