import { useRef } from 'react';

enum ESoundPaths {
  'AUDIO_KEY' = '/sounds/keyboard.wav',
  'AUDIO_DEL' = '/sounds/delete.wav',
  'AUDIO_WRONG_ANSWER' = '/sounds/podgotovka-k-startu.wav',
  'AUDIO_RIGHT_ANSWER' = '/sounds/upali-dengi-na-igrovoy-schet.wav',
  'AUDIO_ENTER' = '/sounds/enter.wav',
  'AUDIO_END' = '/sounds/zvuk-pobedyi-v-igrovom-urovne-30120.wav',
  'AUDIO_END_LEVEL' = '/sounds/end-level.wav',
  'AUDIO_CHOICE_NUMBER' = '/sounds/choise.wav',
}

export const useSound = () => ({
  audioDel: useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_DEL) : undefined
  ),

  audioKey: useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_KEY) : undefined
  ),

  audioRightAnsw: useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_RIGHT_ANSWER) : undefined
  ),

  audioWrongAnsw: useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_WRONG_ANSWER) : undefined
  ),

  audioCatFinish: useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_END) : undefined
  ),

  audioLevelFinish: useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(ESoundPaths.AUDIO_END_LEVEL) : undefined
  ),
});
