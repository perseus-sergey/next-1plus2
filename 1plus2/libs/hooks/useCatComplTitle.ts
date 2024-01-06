import { useEffect, useState } from 'react';
import { EMessageNames } from '../langMessages';

export const useCatComplTitle = (exsQuant: number, mistQuant: number, isCatFinish = false) => {
  const [{ catCompleteTitle, btnCatCompleteTitle }, setTitles] = useState({
    catCompleteTitle: EMessageNames.NO_BAD,
    btnCatCompleteTitle: EMessageNames.NO_BAD,
  });

  useEffect(() => {
    if (!isCatFinish) return;

    const mistakeCoeff = mistQuant / exsQuant;
    setTitles({
      catCompleteTitle: !mistakeCoeff
        ? EMessageNames.BRAVO
        : mistakeCoeff <= 0.2
          ? EMessageNames.NO_BAD
          : EMessageNames.BAD,
      btnCatCompleteTitle: !mistakeCoeff ? EMessageNames.CONTINUE : EMessageNames.CORRECTION,
    });
  }, [isCatFinish]);

  return { catCompleteTitle, btnCatCompleteTitle };
};
