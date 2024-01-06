import { useEffect, useState } from 'react';
import { ELang, EMessageNames, getTitleFromMap } from '../langMessages';

export const useCatComplTitle = (
  language: ELang,
  exsQuant: number,
  mistQuant: number,
  isCatFinish = false
) => {
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
  //   const mistakeCoeff = mistQuant / exsQuant;
  //   setTitles({
  //     catCompleteTitle: !mistakeCoeff
  //       ? getTitleFromMap(EMessageNames.BRAVO, language)
  //       : mistakeCoeff <= 0.2
  //         ? getTitleFromMap(EMessageNames.NO_BAD, language)
  //         : getTitleFromMap(EMessageNames.BAD, language),
  //     btnCatCompleteTitle: !mistakeCoeff
  //       ? getTitleFromMap(EMessageNames.CONTINUE, language)
  //       : getTitleFromMap(EMessageNames.CORRECTION, language),
  //   });
  // }, [isCatFinish]);

  return { catCompleteTitle, btnCatCompleteTitle };
};
