'use client';

import { useState } from 'react';
import { BaseButton } from '../TextButton/BaseButton';
import { ELang } from '@/models/types';
import CloseModalBtn from '../TextButton/CloseModalBtn';

export default function HangmanRules({ lang }: { lang: ELang }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <BaseButton
        ariaLabel={lang === ELang.ua ? 'Відкрити правила гри' : 'Open the rules of the game'}
        onClick={toggleOpen}
      >
        {/* Стрілочка */}
        <svg
          className={`ml-2 w-6 h-6 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </BaseButton>

      {/* Контент з правилами гри */}
      <div
        className={`overflow-hidden overflow-y-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-72 max-w-lg bg-white text-slate-600 rounded-lg transition-max-height duration-500 ease-in-out ${
          isOpen ? 'max-h-screen p-4' : 'max-h-0'
        }`}
      >
        {lang === ELang.ua ? (
          <>
            <h2 className="relative text-3xl mb-4 px-8 text-center">{`Правила гри "Кат"`}</h2>
            <p className="mb-4">
              {`"Кат" - це класична гра на вгадування слів, де ваша мета полягає у тому, щоб відгадати
              слово, обираючи літери одну за одною. Кожна неправильно обрана літера наближає малюнок
              до завершення. Якщо слово не вгадане до моменту завершення малюнка, гра закінчується.`}
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li>Гравець обирає одну літеру, щоб спробувати відгадати слово.</li>
              <li>Якщо літера є у слові, вона з’явиться у відповідних місцях.</li>
              <li>{`Якщо літери немає у слові, малюнок "ката" прогресує на один крок.`}</li>
              <li>
                Гра продовжується, поки або слово не буде повністю вгадане, або малюнок не
                завершиться.
              </li>
            </ol>
            <p className="mb-4">
              {`Ваше завдання — вгадати слово до того, як малюнок "ката" буде завершений. Удачі!`}
            </p>
          </>
        ) : (
          <>
            <h2 className="relative text-3xl mb-4 px-8 text-center">Hangman Game Rules</h2>
            <p className="mb-4">
              Hangman is a classic word-guessing game where your goal is to guess the hidden word by
              selecting letters one at a time. Each incorrect letter brings the drawing closer to
              completion. If the word is not guessed before the drawing is complete, the game is
              over.
            </p>
            <ol className="list-decimal list-inside mb-4">
              <li>Pick a letter to try and guess the word.</li>
              <li>If the letter is in the word, it will appear in the correct position.</li>
              <li>If the letter is not in the word, the hangman drawing progresses by one step.</li>
              <li>
                The game continues until the word is fully guessed or the drawing is completed.
              </li>
            </ol>
            <p className="mb-4">
              Your task is to guess the word before the hangman drawing is finished. Good luck!
            </p>
          </>
        )}

        <CloseModalBtn closeFn={toggleOpen} lang={lang} />
      </div>
    </>
  );
}
