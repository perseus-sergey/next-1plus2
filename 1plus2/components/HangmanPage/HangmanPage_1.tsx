'use client';

import { useState, useEffect } from 'react';
import styles from './HangmanPage.module.css';
import Image from 'next/image';
// import { sql } from '@vercel/postgres';

// const fetchRandomWord = async () => {
//   console.log('🚀 ~ fetchRandomWord ~ rows:'); //
//   try {
//     const { rows } = await sql`
//       SELECT hint, word FROM words
//       ORDER BY RANDOM()
//       LIMIT 1;
//     `;
//     // const { hint, word } = rows[0];
//     return rows[0];
//   } catch (error) {
//     console.error('Error fetching word:', error);
//     return error instanceof Error ? error : new Error('ERROR: fetching data failed');
//     // return { word: 'default', hint: 'default hint' };
//   }
// };

const fetchRandomWord = async () => {
  console.log('🚀 ~ fetchRandomWord ~ rows:'); //
  return { word: 'default', hint: 'default hint' };
};

function HangmanPage() {
  const [currentWord, setCurrentWord] = useState('');
  const [currentHint, setCurrentHint] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Функція для старту гри
  const startGame = async () => {
    console.log('🚀 ~ startGame');
    const fetchRandomWordRes = await fetchRandomWord();
    if (fetchRandomWordRes instanceof Error) return;

    const { word, hint } = fetchRandomWordRes;

    setCurrentWord(word.toLowerCase());
    setCurrentHint(hint);
    setGuessedLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setWrongGuesses(0);
    setIsWinModalOpen(false);
    setIsLoseModalOpen(false);
  };

  console.log('🚀 ~ root');
  useEffect(() => {
    console.log('🚀 ~ useEffect');
    const initGame = async () => {
      await startGame();
    };

    initGame();
  }, []);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || wrongGuesses >= 6) return;

    setGuessedLetters((prev) => [...prev, letter]);

    if (currentWord.includes(letter)) {
      setCorrectLetters((prev) => [...prev, letter]);
      if (currentWord.split('').every((char) => guessedLetters.includes(char) || char === letter)) {
        showWinModal(`You guessed the word: ${currentWord}`);
      }
    } else {
      setIncorrectLetters((prev) => [...prev, letter]);
      setWrongGuesses((prev) => {
        const newWrongGuesses = prev + 1;
        if (newWrongGuesses === 6) {
          showLoseModal(`The word was: ${currentWord}`);
        }
        return newWrongGuesses;
      });
    }
  };

  const showWinModal = (message: string) => {
    setModalMessage(message);
    setIsWinModalOpen(true);
  };

  const showLoseModal = (message: string) => {
    setModalMessage(message);
    setIsLoseModalOpen(true);
  };

  const closeModal = () => {
    setIsWinModalOpen(false);
    setIsLoseModalOpen(false);
  };

  const handleStartAgain = async () => {
    closeModal();
    await startGame();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toLowerCase();
      if (/^[a-z]$/.test(letter)) {
        handleGuess(letter);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessedLetters, wrongGuesses, currentWord]);

  return currentWord ? (
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
        <div className={styles.wordDisplay}>
          {currentWord.split('').map((letter, index) => (
            <span key={index} className="inline-block w-6 text-center">
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>
        <div className={styles.hint}>
          <b>Hint:</b> {currentHint}
        </div>
      </div>
      <div className={styles.keyboard}>
        {'abcdefghijklm'.split('').map((letter) => {
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
        {'nopqrstuvwxyz'.split('').map((letter) => {
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
      <div className={styles.guesses}>{`${wrongGuesses} / 6`}</div>
      {isWinModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Congratulations, you won!</h2>
            <p>{modalMessage}</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleStartAgain} className={styles.modalButton}>
                Play again
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoseModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>You lost</h2>
            <p>{modalMessage}</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleStartAgain} className={styles.modalButton}>
                Start again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default HangmanPage;
