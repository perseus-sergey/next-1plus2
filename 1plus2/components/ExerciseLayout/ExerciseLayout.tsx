'use client';

import { ELang } from '@/libs/langMessages';
import { EExerciseCategories } from '@/libs/exercises/math.model';
import LanguageProvider from '@/libs/context/LangProvider';
import DragProvider from '@/libs/context/DragProvider';
import ExercisePage from '../ExercisePage/ExercisePage';

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
