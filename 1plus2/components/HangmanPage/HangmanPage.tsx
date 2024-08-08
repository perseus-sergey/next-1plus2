'use client';

import { useState, useEffect } from 'react';
import styles from './HangmanPage.module.css';
import { wordList } from '@/libs/hangman/words';
import Image from 'next/image';

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

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const selectedWord = wordList[randomIndex];
    setCurrentWord(selectedWord.word.toLowerCase());
    setCurrentHint(selectedWord.hint);
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

  const handleStartAgain = () => {
    closeModal();
    startGame();
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
  );
}

export default HangmanPage;
