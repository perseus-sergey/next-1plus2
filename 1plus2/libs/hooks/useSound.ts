import useSound from 'use-sound';

enum ESoundPaths {
  'AUDIO_DEL' = '/sounds/delete.wav',
  'AUDIO_KEY' = '/sounds/keyboard.wav',
  'AUDIO_RIGHT_ANSWER' = '/sounds/upali-dengi-na-igrovoy-schet.wav',
  'AUDIO_WRONG_ANSWER' = '/sounds/podgotovka-k-startu.wav',
  'AUDIO_END' = '/sounds/zvuk-pobedyi-v-igrovom-urovne-30120.wav',
  'AUDIO_END_LEVEL' = '/sounds/end-level.wav',
  'AUDIO_ENTER' = '/sounds/enter.wav',
  'AUDIO_CHOICE_NUMBER' = '/sounds/choise.wav',
}

export const useMySound = () => {
  const [audioDel] = useSound(ESoundPaths.AUDIO_DEL, { interrupt: true });
  const [audioKey] = useSound(ESoundPaths.AUDIO_KEY, { interrupt: true });
  const [audioRightAnsw] = useSound(ESoundPaths.AUDIO_RIGHT_ANSWER, { interrupt: true });
  const [audioWrongAnsw] = useSound(ESoundPaths.AUDIO_WRONG_ANSWER, { interrupt: true });
  const [audioCatFinish] = useSound(ESoundPaths.AUDIO_END, { interrupt: true });
  const [audioLevelFinish] = useSound(ESoundPaths.AUDIO_END_LEVEL, { interrupt: true });
  return {
    audioDel,
    audioKey,
    audioRightAnsw,
    audioWrongAnsw,
    audioCatFinish,
    audioLevelFinish,
  };
};

// export const useMySound = () => ({
//   audioDel: useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_DEL) : undefined
//   ),

//   audioKey: useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_KEY) : undefined
//   ),

//   audioRightAnsw: useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_RIGHT_ANSWER) : undefined
//   ),

//   audioWrongAnsw: useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_WRONG_ANSWER) : undefined
//   ),

//   audioCatFinish: useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_END) : undefined
//   ),

//   audioLevelFinish: useRef<HTMLAudioElement | undefined>(
//     typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_END_LEVEL) : undefined
//   ),
// });
