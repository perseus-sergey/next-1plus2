'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ELang } from '@models/types';
import { fetchRandomWord } from '@/libs/hangman/hangman.controller';
import { BaseButton } from '../TextButton/BaseButton';

const convertToCorrectLayout = (letter: string): string => {
  // Українська розкладка відповідає англійським літерам за такими ключами
  const uaToEn: { [key: string]: string } = {
    а: 'f',
    б: ',',
    в: 'd',
    г: 'u',
    д: 'l',
    е: 't',
    є: "'",
    ж: ';',
    з: 'p',
    и: 'b',
    і: 's',
    ї: ']',
    й: 'q',
    к: 'r',
    л: 'k',
    м: 'v',
    н: 'y',
    о: 'j',
    п: 'g',
    р: 'h',
    с: 'c',
    т: 'n',
    у: 'e',
    ф: 'a',
    х: '[',
    ц: 'w',
    ч: 'x',
    ш: 'i',
    щ: 'o',
    ь: 'm',
    ю: '.',
    я: 'z',
    ґ: '`',
  };

  // Англійська розкладка відповідає українським літерам за такими ключами
  const enToUa: { [key: string]: string } = {
    f: 'а',
    ',': 'б',
    d: 'в',
    u: 'г',
    l: 'д',
    t: 'е',
    "'": 'є',
    ';': 'ж',
    p: 'з',
    b: 'и',
    s: 'і',
    ']': 'ї',
    q: 'й',
    r: 'к',
    k: 'л',
    v: 'м',
    y: 'н',
    j: 'о',
    g: 'п',
    h: 'р',
    c: 'с',
    n: 'т',
    e: 'у',
    a: 'ф',
    '[': 'х',
    w: 'ц',
    x: 'ч',
    i: 'ш',
    o: 'щ',
    m: 'ь',
    '.': 'ю',
    z: 'я',
    '`': 'ґ',
  };

  // Якщо введена літера англійська, конвертуємо в українську
  if (uaToEn[letter]) {
    return uaToEn[letter];
  }
  // Якщо введена літера українська, конвертуємо в англійську
  if (enToUa[letter]) {
    return enToUa[letter];
  }

  // Якщо не знайдено відповідника, повертаємо оригінальну літеру
  return letter;
};

interface IProps {
  lang: ELang;
}

function HangmanPage({ lang }: IProps) {
  // const [language, setLanguage] = useState('en');
  const [currentWord, setCurrentWord] = useState('');
  const [currentHint, setCurrentHint] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    startGame();
  }, [lang]);

  const startGame = async () => {
    const selectedWord = await fetchRandomWord(lang);
    if (!selectedWord) return;

    setCurrentWord(selectedWord.word.toLowerCase());
    setCurrentHint(selectedWord.hint);
    setGuessedLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setWrongGuesses(0);
    setIsWinModalOpen(false);
    setIsLoseModalOpen(false);
  };

  const handleGuess = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || wrongGuesses >= 6) return;

      setGuessedLetters((prev) => [...prev, letter]);

      if (currentWord.includes(letter)) {
        setCorrectLetters((prev) => [...prev, letter]);
        if (
          currentWord.split('').every((char) => guessedLetters.includes(char) || char === letter)
        ) {
          showWinModal(`${currentWord}`);
        }
      } else {
        setIncorrectLetters((prev) => [...prev, letter]);
        setWrongGuesses((prev) => {
          const newWrongGuesses = prev + 1;
          if (newWrongGuesses === 6) {
            showLoseModal(`${currentWord}`);
          }
          return newWrongGuesses;
        });
      }
    },
    [guessedLetters, wrongGuesses, currentWord]
  );

  const showWinModal = (message: string) => {
    const winMessage =
      lang === ELang.ua ? `Ви вгадали слово: "${message}"` : `You guessed the word: "${message}"`;
    setModalMessage(winMessage);
    setIsWinModalOpen(true);
  };

  const showLoseModal = (message: string) => {
    const loseMessage =
      lang === ELang.ua ? `Слово було: "${message}"` : `The word was: "${message}"`;
    setModalMessage(loseMessage);
    setIsLoseModalOpen(true);
  };

  const closeModal = () => {
    setIsWinModalOpen(false);
    setIsLoseModalOpen(false);
  };

  const handleStartAgain = () => {
    closeModal();
    startGame();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let letter = event.key.toLowerCase();

      if (lang === 'ua' && /^[a-z]$/.test(letter)) {
        letter = convertToCorrectLayout(letter);
      } else if (lang === ELang.en && /^[а-щьюяґєії]$/.test(letter)) {
        letter = convertToCorrectLayout(letter);
      }

      if (
        (lang === ELang.en && /^[a-z]$/.test(letter)) ||
        (lang === ELang.ua && /^[а-щьюяґєії]$/.test(letter))
      ) {
        handleGuess(letter);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessedLetters, wrongGuesses, currentWord, lang]);

  return (
    <section className="max-w-screen-lg flex flex-col gap-6">
      <div
        className={`max-w-full p-5 flex flex-col gap-2 shadow-md rounded-xl text-center text-white`}
      >
        <Image
          src={`/img/hangman${wrongGuesses}.svg`}
          width={250}
          height={250}
          alt="Hangman Image"
          className="w-full max-w-52 m-auto"
        />
        <div className="text-xl flex justify-center">{`${wrongGuesses} / 6`}</div>
        <div className="flex text-3xl gap-2 p-5 justify-center flex-wrap h-20">
          {currentWord.split('').map((letter, index) => (
            <span key={index} className="inline-block w-6 text-center">
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>
        <div className="text-xl py-5 sm:h-28 h-40">
          <b>{lang === ELang.ua ? 'Підказка:' : 'Hint:'}</b> {currentHint}
        </div>
      </div>

      <div className={`max-w-4xl m-auto flex flex-wrap justify-center gap-1`}>
        {(lang === ELang.ua ? `абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'` : `abcdefghijklmnopqrstuvwxyz'`)
          .split('')
          .map((letter) => {
            const isCorrect = correctLetters.includes(letter);
            const isIncorrect = incorrectLetters.includes(letter);

            return (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter)}
                className={`flex-grow flex-shrink-0 basis-1/5 text-white m-1 py-2 px-4 text-xl rounded shadow-md max-w-12 transition-colors duration-300 ${isCorrect ? 'bg-green-500' : isIncorrect ? 'bg-red-500' : 'bg-stone-600'} ${guessedLetters.includes(letter) ? 'cursor-not-allowed' : ''}`}
              >
                {letter}
              </button>
            );
          })}
      </div>

      {isWinModalOpen && (
        <HangmanModal
          lang={lang}
          titleMessage={lang === ELang.ua ? 'Вітаємо, ви виграли!' : 'Congratulations, you won!'}
          modalMessage={modalMessage}
          clickFn={handleStartAgain}
          btnTitle={lang === ELang.ua ? 'Продовжувати грати' : 'Continue playing'}
        />
      )}

      {isLoseModalOpen && (
        <HangmanModal
          lang={lang}
          titleMessage={lang === ELang.ua ? 'Ви програли!' : 'You lost!'}
          modalMessage={modalMessage}
          clickFn={handleStartAgain}
          btnTitle={lang === ELang.ua ? 'Почати знову' : 'Start again'}
        />
      )}
    </section>
  );
}

const HangmanModal = ({
  lang,
  titleMessage,
  modalMessage,
  btnTitle,
  clickFn,
}: {
  lang: ELang;
  titleMessage: string;
  modalMessage: string;
  btnTitle: string;
  clickFn: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg text-center text-slate-600 shadow-lg max-w-[90%] w-96">
        <h2 className="text-2xl">{titleMessage}</h2>
        <p>{modalMessage}</p>
        <div className="flex justify-center mt-5">
          <BaseButton
            ariaLabel={lang === ELang.ua ? 'Почати нову гру' : 'Start a new game'}
            onClick={clickFn}
            className="py-3 px-5 rounded bg-blue-500 hover:bg-blue-600 text-white"
          >
            {btnTitle}
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default HangmanPage;
