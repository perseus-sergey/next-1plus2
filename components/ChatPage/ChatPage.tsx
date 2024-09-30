'use client';

import React, { useState } from 'react';
import styles from './ChatPage.module.scss'; // Перевірте правильність шляху до стилів
import { ELang } from '@/libs/langMessages';

interface ChatPageProps {
  lang: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ lang }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) {
      setResponse(
        lang === ELang.ua
          ? 'Будь ласка, введіть питання для вашого ворожіння на Таро.'
          : 'Please enter a question for your tarot reading.'
      );
      return;
    }

    const fakeResponses = [
      'Your future holds great fortune, but be cautious of your surroundings.',
      'Love and passion will guide your path, but don’t ignore the signs of caution.',
      'A major change is coming in your life, embrace it with open arms.',
      'Trust in your intuition, as it will lead you to success and happiness.',
      'An unexpected journey will bring you new opportunities and challenges.',
    ];

    const randomResponse = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
    setResponse(randomResponse);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="question">Your Question</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && <div className={styles.response}>{response}</div>}
    </div>
  );
};

export default ChatPage;
