'use client';

import { ELang } from '@models/types';
import LanguageProvider from '@/libs/context/LangProvider';
import DragProvider from '@/libs/context/DragProvider';
import ExercisePage from '../ExercisePage/ExercisePage';
import { EExerciseCategories } from '@/models/math/types';

interface IProps {
  lang: ELang;
  chosenMaxNum: number;
  cat: EExerciseCategories;
  levels?: EExerciseCategories[];
}

const ExerciseLayout = ({ cat, chosenMaxNum, lang, levels }: IProps) => (
  <LanguageProvider language={lang}>
    <DragProvider>
      <ExercisePage chosenMaxNum={chosenMaxNum} cat={cat} levels={levels} />
    </DragProvider>
  </LanguageProvider>
);

export default ExerciseLayout;
