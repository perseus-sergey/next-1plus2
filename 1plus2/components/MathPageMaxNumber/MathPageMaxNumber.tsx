import { ICatNamePageProps } from '@/app/[lang]/math/category/[cat]/page';
// import styles from './MathPageMaxNumber.module.scss';
import { EMessageNames, getTitleFromMap } from '@/libs/langMessages';
import KeyboardButton from '../KeyboardButton/KeyboardButton';
import { createMaxNumArray } from '@/libs/utils';
import { Title } from '../Title/Title';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { categoriesMap } from '@/libs/exercises/math.model';

const MathPageMaxNumber = ({ params }: ICatNamePageProps) => {
  const catObj = categoriesMap.get(params.cat);

  if (!catObj) return redirect(`/${params.lang}/math/category`);

  return (
    <section className="keyboard" data-testid="MathPageMaxNumber">
      <Title name={getTitleFromMap(EMessageNames.CHOICE_MAX_EXS_NUM, params.lang)} />

      <div className="keyboard-line">
        {createMaxNumArray(catObj.exercise).map((value) => (
          <Link href={`/${params.lang}/math/category/${params.cat}/${value}`} key={value}>
            <KeyboardButton value={`${value}`} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MathPageMaxNumber;
