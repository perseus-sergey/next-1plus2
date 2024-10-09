import styles from '../EndLevel/EndLevel.module.scss';
import { Title } from '../Title/Title';
import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { shuffleArray, sleep } from '@/libs/utils';
import { BaseButton } from '../TextButton/BaseButton';
import { SeoSVG } from '../Svg/SeoSVG';
import { useMySound } from '@/libs/hooks/useSound';
import { PlayFunction } from 'use-sound/dist/types';
import { ModalConfirmExitTask } from './ModalAddRepeaterTask';
import { ELang } from '@models/types';
import { ITranslation, REPEATER_PAGE_TEXT } from '@/models/repeater.model';

interface IProps {
  translations: ITranslation[];
  setIsTestStarted: Dispatch<SetStateAction<boolean>>;
  translationsLength: number;
  lang: ELang;
}

enum EAnswer {
  '_',
  'RIGHT',
  'BAD',
}

const makeUniqueArray = (array: ITranslation[]): ITranslation[] => {
  const uniqueIds = new Set();
  return array.filter((item) => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      return true; // Залишаємо унікальний елемент
    }
    return false; // Пропускаємо дублікати
  });
};

const RepeaterTestPage = ({ translations, setIsTestStarted, translationsLength, lang }: IProps) => {
  const [shuffledArray, setShuffledArray] = useState<ITranslation[]>(translations);
  const [currentTask, setCurrentTask] = useState<ITranslation | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [errorArray, setErrorArray] = useState<ITranslation[]>([]);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(EAnswer._);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { audioDel, audioRightAnsw, audioWrongAnsw, audioLevelFinish } = useMySound();

  const playSound = (sound: PlayFunction) => sound();

  const handleCorrectAnswer = useCallback(async () => {
    playSound(audioRightAnsw);
    setAnswerStatus(EAnswer.RIGHT);
    setShuffledArray((prev) => prev.slice(1)); // Видаляємо поточне завдання

    await sleep();

    setAnswerStatus(EAnswer._);
    setUserAnswer(''); // Очищуємо інпут після правильної відповіді
  }, [audioRightAnsw, setAnswerStatus, setShuffledArray, setUserAnswer]);

  // Функція для обробки неправильної відповіді
  const handleWrongAnswer = useCallback(
    async (isHint = false) => {
      if (!currentTask) return;

      playSound(audioWrongAnsw);
      setAnswerStatus(EAnswer.BAD);
      if (isHint) setUserAnswer(currentTask.english);
      setErrorArray((prev) => [...prev, currentTask]); // Додаємо помилку до масиву
      setShuffledArray((prev) => [...prev, currentTask]); // Додаємо завдання знову до кінця черги

      await sleep();

      setAnswerStatus(EAnswer._);
    },
    [audioWrongAnsw, setAnswerStatus, setErrorArray, currentTask, setShuffledArray]
  );

  const handleSubmit = async () => {
    if (!currentTask) return;

    const fieldHandler = (text: string) => text.toLowerCase().trim();

    const answer = fieldHandler(userAnswer);

    if (answer.length === 0) return;

    if (answer === fieldHandler(currentTask.english)) {
      // Правильна відповідь
      await handleCorrectAnswer();
    } else {
      // Неправильна відповідь
      await handleWrongAnswer();
    }
  };

  // Завершення тесту
  const handleEndTest = () => {
    setIsTestStarted(false);
    // setIsTestCompleted(false);
  };

  // Розпочати виправлення помилок
  const handleErrorCorrection = () => {
    setShuffledArray(shuffleArray([...makeUniqueArray(errorArray)]));
    setErrorArray([]);
    setIsTestCompleted(false);
  };

  useEffect(() => {
    const shuffled = shuffleArray(translations);
    setShuffledArray(shuffled);
    setCurrentTask(shuffled[0]);
    setIsTestStarted(true);
    setErrorArray([]);
  }, []);

  useEffect(() => {
    if (shuffledArray.length === 0) {
      // Якщо масив завдань порожній, через 1 секунду показуємо екран статистики
      const finishTest = async () => {
        await sleep(); // Затримка перед показом статистики
        setIsTestCompleted(true); // Переходимо на екран статистики
      };
      finishTest();
    } else {
      const nextTask = async () => {
        await sleep(); // Затримка перед показом статистики
        setCurrentTask(shuffledArray[0]);
      };
      nextTask();
    }
  }, [shuffledArray]);

  useEffect(() => {
    if (isTestCompleted && errorArray.length === 0) playSound(audioLevelFinish);
  }, [isTestCompleted]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentTask, shuffledArray, errorArray, answerStatus]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const closeExitModal = () => setIsExitModalOpen(false);

  if (!currentTask) return null;

  return (
    <>
      <Title
        name={
          isTestCompleted
            ? errorArray.length === 0
              ? `Congratulations! The test of ${translationsLength} phrases is completed!`
              : 'Statistics'
            : 'Test'
        }
        className={isTestCompleted && errorArray.length === 0 ? styles.EndLevelTitle : ''}
      />

      <article className="container min-h-[75vh] mx-auto p-4 text-white flex flex-col items-center">
        <p>{REPEATER_PAGE_TEXT[lang]}</p>
        <div className="text-white relative w-full max-w-3xl text-center">
          {/* Екран статистики */}
          {isTestCompleted ? (
            <>
              {errorArray.length > 0 && (
                <section className="flex flex-col justify-center items-center text-xl">
                  <p>Total phrases: {translationsLength}</p>
                  <p>Total errors: {errorArray.length}</p>
                  <BaseButton
                    ariaLabel="Correct the mistakes"
                    className="w-fit flex items-center gap-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded mt-8"
                    onClick={handleErrorCorrection}
                  >
                    <SeoSVG strokeWidth={0.2}>
                      <path
                        fill="currentColor"
                        d="m20 7l-.95-2.05L17 4l2.05-.95L20 1l.95 2.05L23 4l-2.05.95L20 7ZM8.5 7l-.95-2.05L5.5 4l2.05-.95L8.5 1l.95 2.05L11.5 4l-2.05.95L8.5 7ZM20 18.5l-.95-2.05L17 15.5l2.05-.95l.95-2.05l.95 2.05l2.05.95l-2.05.95L20 18.5ZM5.1 21.7l-2.8-2.8q-.3-.3-.3-.725t.3-.725L13.45 6.3q.3-.3.725-.3t.725.3l2.8 2.8q.3.3.3.725t-.3.725L6.55 21.7q-.3.3-.725.3t-.725-.3Zm.75-2.1L13 12.4L11.6 11l-7.2 7.15l1.45 1.45Z"
                      />
                    </SeoSVG>
                    Error Correction
                  </BaseButton>
                </section>
              )}

              {errorArray.length === 0 && (
                <BaseButton
                  className={`${styles.endLevelBtn} mt-40 bg-blue-600 text-white p-4 rounded-md`}
                  ariaLabel="Come back to start screen"
                  onClick={handleEndTest}
                >
                  Come Back
                </BaseButton>
              )}
            </>
          ) : (
            <>
              {/* Екран Test */}

              <BaseButton
                ariaLabel="Finish test and come back to dictionary"
                className="absolute top-0 left-0 flex flex-col items-center text-slate-300 hover:text-slate-400"
                onClick={() => setIsExitModalOpen(true)}
              >
                <SeoSVG className="w-8 h-8" strokeWidth={1.5} viewBox="0 0 24 24">
                  <g fill="none" stroke="currentColor">
                    <path d="M9 4.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h1M9 6.476c0-2.293 0-3.44.707-4.067s1.788-.439 3.95-.062l2.33.407c2.394.417 3.591.626 4.302 1.504c.711.879.711 2.149.711 4.69v6.105c0 2.54 0 3.81-.71 4.689c-.712.878-1.91 1.087-4.304 1.505l-2.328.406c-2.162.377-3.243.565-3.95-.062S9 19.817 9 17.524z" />
                    <path strokeLinecap="round" d="M12 11v2" />
                  </g>
                </SeoSVG>
                <span className="text-xs">{`< exit`}</span>
              </BaseButton>

              <section className="text-right text-xl">
                <p className="text-green-100">Tasks left: {shuffledArray.length}</p>
                <p className="text-red-100">Errors: {errorArray.length}</p>
              </section>

              <div className="mt-4">
                <p
                  className={`${answerStatus === EAnswer.BAD ? 'bg-rose-500' : answerStatus === EAnswer.RIGHT ? 'bg-green-500' : 'bg-transparent'} text-2xl sm:text-4xl p-2 rounded text-center mb-4 transition-all duration-200`}
                >
                  {currentTask.ukrainian}
                </p>

                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-slate-900/30 pr-8 border border-slate-400 rounded px-4 py-2 w-full sm:text-2xl text-xl text-slate-50"
                  />

                  <BaseButton
                    ariaLabel="Clear the input field"
                    disabled={userAnswer.length === 0}
                    className="absolute top-1/2 right-0 -translate-y-1/2 px-2 py-1 text-slate-400 cursor-pointer"
                    onClick={() => {
                      playSound(audioDel);
                      setUserAnswer('');
                      if (inputRef.current) inputRef.current.focus();
                    }}
                  >
                    <SeoSVG strokeWidth={0.2} className="w-6 h-6" viewBox="0 0 56 56">
                      <path
                        fill="currentColor"
                        d="M13.785 49.574h28.453c4.899 0 7.336-2.437 7.336-7.265V13.69c0-4.828-2.437-7.265-7.336-7.265H13.785c-4.875 0-7.36 2.414-7.36 7.265v28.62c0 4.851 2.485 7.265 7.36 7.265m5.906-11.203c-1.148 0-2.109-.937-2.109-2.086c0-.539.234-1.054.656-1.476l6.797-6.844l-6.797-6.82c-.422-.422-.656-.938-.656-1.477c0-1.172.96-2.133 2.11-2.133q.843 0 1.476.633l6.844 6.844l6.843-6.844a1.97 1.97 0 0 1 1.454-.633a2.14 2.14 0 0 1 2.132 2.133c0 .54-.234 1.055-.656 1.477l-6.82 6.82l6.82 6.844c.422.422.656.937.656 1.476c0 1.149-.96 2.086-2.133 2.086c-.538 0-1.054-.21-1.43-.586l-6.866-6.89l-6.868 6.89a2.04 2.04 0 0 1-1.453.586"
                      />
                    </SeoSVG>
                  </BaseButton>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 w-full py-6">
                <BaseButton
                  ariaLabel="Confirm answer"
                  disabled={answerStatus !== EAnswer._}
                  className="w-32 flex items-center justify-center gap-4 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md"
                  onClick={handleSubmit}
                >
                  <span>Confirm</span>
                  <SeoSVG strokeWidth={0.2} className="w-6 h-6" viewBox="0 0 15 16">
                    <path
                      fill="currentColor"
                      d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34q.075.27 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z"
                    />
                  </SeoSVG>
                </BaseButton>

                <BaseButton
                  ariaLabel="Show right answer"
                  className="text-yellow-200 hover:text-yellow-100 flex flex-col justify-center items-center"
                  onClick={() => handleWrongAnswer(true)}
                >
                  <SeoSVG strokeWidth={0.2} className="w-10 h-10">
                    <path
                      fill="currentColor"
                      d="M9.5 3a7.5 7.5 0 0 0-6.797 10.675a68 68 0 0 0-.681 3.142a.996.996 0 0 0 1.153 1.17c.623-.11 1.978-.36 3.236-.65A7.5 7.5 0 1 0 9.5 3M7.09 7.396c.264-.486.612-.853 1.054-1.089c.434-.232.901-.306 1.356-.306a2.62 2.62 0 0 1 1.632.577c.517.424.868 1.074.868 1.922c0 .975-.689 1.504-1.077 1.802l-.085.066c-.424.333-.588.511-.588.882a.75.75 0 0 1-1.5 0c0-1.134.711-1.708 1.162-2.062c.513-.403.588-.493.588-.688c0-.397-.149-.622-.32-.761A1.1 1.1 0 0 0 9.5 7.5c-.295 0-.498.049-.65.13c-.143.076-.294.21-.44.48a.75.75 0 1 1-1.32-.715M9.5 13a1 1 0 1 1 0 2a1 1 0 0 1 0-2m-.1 6a7.47 7.47 0 0 0 5.1 2c1.1 0 2.145-.237 3.088-.664c1.044.245 2.186.488 2.913.64a1.244 1.244 0 0 0 1.468-1.499c-.163-.703-.419-1.795-.672-2.803A7.503 7.503 0 0 0 16.953 6.41c.35.637.622 1.324.8 2.047A6 6 0 0 1 20.5 13.5c0 .991-.24 1.924-.664 2.747l-.13.253l.07.275c.227.896.466 1.9.641 2.65a117 117 0 0 1-2.739-.609l-.265-.063l-.243.122c-.803.4-1.71.625-2.67.625a6 6 0 0 1-2.919-.757a8.5 8.5 0 0 1-2.18.256"
                    />
                  </SeoSVG>
                  <span className="text-xs">help</span>
                </BaseButton>
              </div>
            </>
          )}
        </div>
      </article>
      {isExitModalOpen && (
        <ModalConfirmExitTask
          lang={lang}
          confirmExit={() => handleEndTest()}
          closeModal={() => closeExitModal()}
        />
      )}
    </>
  );
};

export default React.memo(RepeaterTestPage);
