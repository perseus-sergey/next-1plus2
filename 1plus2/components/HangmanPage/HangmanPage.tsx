'use client';

import { useState, useEffect } from 'react';
import styles from './HangmanPage.module.scss';
import footer from './globals.scss';
import Image from 'next/image';
import { poolQuery } from '@/libs/db/pg';
import { ELang } from '@/libs/langMessages';

const fetchRandomWord = async (lang: string) => {
  const columnWord = lang === 'ua' ? 'word_ua' : 'word';
  const columnHint = lang === 'ua' ? 'hint_ua' : 'hint';

  return poolQuery(`
    SELECT ${columnHint} AS hint, ${columnWord} AS word
    FROM words
    ORDER BY RANDOM()
    LIMIT 1;
  `);
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
    if (selectedWord instanceof Error) return;

    setCurrentWord(selectedWord[0].word.toLowerCase());
    setCurrentHint(selectedWord[0].hint);
    setGuessedLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setWrongGuesses(0);
    setIsWinModalOpen(false);
    setIsLoseModalOpen(false);
  };

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || wrongGuesses >= 6) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (currentWord.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
      if (currentWord.split('').every((char) => guessedLetters.includes(char) || char === letter)) {
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
  };

  const showWinModal = (message: string) => {
    const winMessage =
      lang === ELang.ua ? `Ви вгадали слово: ${message}` : `You guessed the word: ${message}`;
    setModalMessage(winMessage);
    setIsWinModalOpen(true);
  };

  const showLoseModal = (message: string) => {
    const loseMessage = lang === ELang.ua ? `Слово було: ${message}` : `The word was: ${message}`;
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

      const englishChars = /^[a-z]$/;
      const ukrainianChars = /^[а-щьюяґєії]$/;

      if (lang === ELang.en && englishChars.test(letter)) {
        handleGuess(letter);
      } else if (lang === ELang.ua && ukrainianChars.test(letter)) {
        handleGuess(letter);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessedLetters, wrongGuesses, currentWord, lang]);

  return (
    <div>
      <div className={styles.hangman}>
        <Image
          src={`/img/hangman${wrongGuesses}.svg`}
          width={250}
          height={250}
          alt="Hangman Image"
          className={styles.hangmanImage}
        />
      </div>
      <div className={styles.game}>
        <div className={styles.guesses}>{`${wrongGuesses} / 6`}</div>
        <div className={styles.wordDisplay}>
          {currentWord.split('').map((letter, index) => (
            <span key={index} className="inline-block w-6 text-center">
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>
        <div className={styles.hint}>
          <b>{lang === ELang.ua ? 'Підказка:' : 'Hint:'}</b> {currentHint}
        </div>
      </div>
      <div className={styles.keyboard}>
        {(lang === ELang.ua ? 'абвгґдеєжзиіїйклмн' : 'abcdefghijklm').split('').map((letter) => {
          const isCorrect = correctLetters.includes(letter);
          const isIncorrect = incorrectLetters.includes(letter);
          const buttonClass = isCorrect ? styles.correct : isIncorrect ? styles.incorrect : '';

          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`${styles.button} ${buttonClass} ${guessedLetters.includes(letter) ? styles.disabled : ''}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
      <div className={styles.keyboard}>
        {(lang === ELang.ua ? 'опрстуфхцчшщьюя' : 'nopqrstuvwxyz').split('').map((letter) => {
          const isCorrect = correctLetters.includes(letter);
          const isIncorrect = incorrectLetters.includes(letter);
          const buttonClass = isCorrect ? styles.correct : isIncorrect ? styles.incorrect : '';

          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter)}
              className={`${styles.button} ${buttonClass} ${guessedLetters.includes(letter) ? styles.disabled : ''}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
      {isWinModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>{lang === ELang.ua ? 'Вітаємо, ви виграли!' : 'Congratulations, you won!'}</h2>
            <p>{modalMessage}</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleStartAgain} className={styles.modalButton}>
                {lang === ELang.ua ? 'Продовжувати грати' : 'Continue playing'}
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoseModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>{lang === ELang.ua ? 'Ви програли' : 'You lost'}</h2>
            <p>{modalMessage}</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleStartAgain} className={styles.modalButton}>
                {lang === ELang.ua ? 'почати знову' : 'Start again'}
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="footer">
        {lang === ELang.ua ? (
          <div className="rounded-[0.40rem] bg-aqua/40 p-[0.24rem] text-black">
            <p>
              <kbd className="text-darkble bg-gray-200 rounded px-1">Ctrl</kbd> +{' '}
              <kbd className="text-darkble bg-gray-200 rounded px-1">Пробіл</kbd> або{' '}
              <kbd className="text-darkble bg-gray-200 rounded px-1">Alt</kbd> +{' '}
              <kbd className="text-darkble bg-gray-200 rounded px-1">Shift</kbd> для зміни мови на
              клавіатурі
            </p>
          </div>
        ) : null}
      </footer>
    </div>
  );
}

export default HangmanPage;
