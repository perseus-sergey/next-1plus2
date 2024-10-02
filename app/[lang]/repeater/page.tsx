'use client';

import { ModalAddRepeaterTask, ModalDeleteTask } from '@/components/Repeater/ModalAddRepeaterTask';
import { TableTranslations } from '@/components/Repeater/TableTranslations';
import { BaseButton } from '@/components/TextButton/BaseButton';
import { Title } from '@/components/Title/Title';
import { shuffleArray } from '@/libs/utils';
import { useEffect, useState } from 'react';

export interface ITranslation {
  id: number;
  english: string;
  ukrainian: string;
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

const Page = () => {
  const [translations, setTranslations] = useState<ITranslation[]>([]);

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [shuffledArray, setShuffledArray] = useState<ITranslation[]>([]);
  const [currentTask, setCurrentTask] = useState<ITranslation | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [errorArray, setErrorArray] = useState<ITranslation[]>([]);
  //   const [errorsCount, setErrorsCount] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<ITranslation | null>(null);

  const [newEnglish, setNewEnglish] = useState('');
  const [newUkrainian, setNewUkrainian] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Модальне вікно для підтвердження видалення
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID рядка, який будемо видаляти

  const startTest = () => {
    const shuffled = shuffleArray(translations);
    setShuffledArray(shuffled);
    setCurrentTask(shuffled[0]);
    setIsTestStarted(true);
    // setErrorsCount(0);
    setErrorArray([]);
  };

  const handleSubmit = () => {
    if (!currentTask) return;

    if (userAnswer.toLowerCase() === currentTask.english.toLowerCase()) {
      // Правильна відповідь
      setShuffledArray((prev) => prev.slice(1));
      //   setShuffledArray((prev) => prev.filter((item) => item.id !== currentTask.id));
      setTimeout(() => {
        if (shuffledArray.length > 1) {
          setCurrentTask(shuffledArray[1]);
        } else {
          setIsTestCompleted(true);
        }
      }, 500);
    } else {
      // Неправильна відповідь
      //   const updatedTask = { ...currentTask, userAnswer };
      setErrorArray((prev) => [...prev, currentTask]);
      //   setErrorsCount((prev) => prev + 1);
      setShuffledArray((prev) => [...prev, currentTask]);
    }
    setUserAnswer(''); // Очищуємо інпут
  };

  // Підказка
  const handleHint = () => {
    if (!currentTask) return;
    setUserAnswer(currentTask.english);
    // if (!errorArray.some((item) => item.id === currentTask.id)) {
    setErrorArray((prev) => [...prev, currentTask]);
    //   setErrorsCount((prev) => prev + 1);
    // }
    setShuffledArray((prev) => [...prev, currentTask]);
    // setShuffledArray((prev) => shuffleArray(prev));
  };

  // Завершення тесту
  const handleEndTest = () => {
    setIsTestStarted(false);
    setIsTestCompleted(false);
  };

  // Розпочати виправлення помилок
  const handleErrorCorrection = () => {
    setShuffledArray(shuffleArray([...makeUniqueArray(errorArray)]));
    setErrorArray([]);
    setIsTestCompleted(false);
  };

  // Повторний рендер при завершенні тесту
  useEffect(() => {
    if (isTestStarted && shuffledArray.length === 0) {
      setIsTestCompleted(true);
    }
  }, [shuffledArray]);

  const openModal = (translation?: ITranslation) => {
    if (translation) {
      setIsEditMode(true);
      setCurrentTranslation(translation);
      setNewEnglish(translation.english);
      setNewUkrainian(translation.ukrainian);
    } else {
      setIsEditMode(false);
      setNewEnglish('');
      setNewUkrainian('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTranslation(null);
  };

  const saveTranslation = () => {
    if (isEditMode && currentTranslation) {
      setTranslations((prev) =>
        prev.map((item) =>
          item.id === currentTranslation.id
            ? { ...item, english: newEnglish, ukrainian: newUkrainian }
            : item
        )
      );
    } else {
      const newId = translations.length ? translations[translations.length - 1].id + 1 : 1;
      setTranslations([
        ...translations,
        { id: newId, english: newEnglish, ukrainian: newUkrainian },
      ]);
    }
    closeModal();
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setTranslations((prev) => prev.filter((item) => item.id !== deleteId));
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Title name="Dictionary" className="text-2xl font-bold mb-4" />

      <article className="container min-h-[75vh] mx-auto p-4 text-white flex flex-col items-center">
        {/* Екран dictionary table */}
        {!isTestStarted && !isTestCompleted && (
          <>
            <p className="p-4">
              TOTAL: <span className="text-teal-300 text-xl">{translations.length}</span> phrases
            </p>

            {translations.length > 0 && (
              <TableTranslations
                translations={translations}
                openModal={openModal}
                openDeleteModal={openDeleteModal}
              />
            )}

            <BaseButton
              ariaLabel="Add item to translation table"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => openModal()}
            >
              + Add Item
            </BaseButton>

            {translations.length > 0 && (
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={startTest}>
                Start Test
              </button>
            )}

            {isModalOpen && (
              <ModalAddRepeaterTask
                isEditMode={isEditMode}
                closeModal={closeModal}
                saveTranslation={saveTranslation}
                newEnglish={newEnglish}
                newUkrainian={newUkrainian}
                setNewEnglish={setNewEnglish}
                setNewUkrainian={setNewUkrainian}
              />
            )}

            {isDeleteModalOpen && (
              <ModalDeleteTask closeDeleteModal={closeDeleteModal} confirmDelete={confirmDelete} />
            )}
          </>
        )}

        {/* Екран Test */}
        {isTestStarted && !isTestCompleted && currentTask && (
          <div className="mt-4 text-white">
            {/* <pre>shuffledArray: {JSON.stringify(shuffledArray, null, 2)}</pre> */}
            <h2 className="text-xl font-bold mb-4">Test</h2>
            <p>Tasks left: {shuffledArray.length}</p>
            <p>Errors: {errorArray.length}</p>
            <div className="mt-4">
              <p className="text-2xl text-center mb-4">{currentTask.ukrainian}</p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="bg-white border rounded-sm px-4 py-2 w-full text-slate-900"
              />
            </div>
            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleHint}
              >
                Підказка
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleEndTest}>
                Завершити тест
              </button>
            </div>
          </div>
        )}

        {/* Екран статистики */}
        {isTestCompleted && (
          <div className="mt-4 text-white">
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <p>Total phrases: {translations.length}</p>
            <p>Total errors: {errorArray.length}</p>
            {errorArray.length > 0 && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleErrorCorrection}
              >
                Error Correction
              </button>
            )}
            {errorArray.length === 0 && (
              <>
                <p className="text-lg mt-4">Congratulations! No more errors.</p>

                <BaseButton
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  ariaLabel="Come back to start screen"
                  onClick={handleEndTest}
                >
                  Come Back
                </BaseButton>
              </>
            )}
          </div>
        )}
      </article>
    </>
  );
};

export default Page;

// коли в масиві translations з'являється хочаб один елемент, повинна з'явитися кнопка 'Start test'.
// При натисканні на цю кнопку замість екрану з таблицею з'являється екран 'Test' (без зміни юрл) проходження тесту з елементами:
// - Загальна кількість завдань // дорівнює кількості елементів в масиві
// - `Errors`
// - Строка з украінською фразою
// - Інпут в який треба ввести відповідну англійську фразу
// - Кнопка 'Submit'
// - Кнопка 'Підказка'
// - Кнопка 'Завершити тест'

// Функціонал:
// - спочатку масив завдань (shuffledArray) - це копія масиву translations (але із перемішаними об'єктами)
// - на екрані з'являється фраза украінською, в інпут необхідно ввести відповідну фразу англійською
// - після введення потрібно натиснути Кнопку 'Submit':
// -- при введені правильноі відповіді  фраза стає зеленого кольору, з масиву завдань видаляється об'єкт з правильною відповіддю і через 0.5 сек з'являється інша фраза
// -- при введені неправильноі відповіді  фраза стає червоног кольору, фраза залишається на екрані, в кінець масиву додається об'єкт з неправильно введеною фразою. Якщо іще не існує, створюється новий масив (errorArray) з об'єктами з помилками, в який також додається об'єкт з помилковою фразою. На екрані у елемента `Errors` відображається кількість помилок у errorArray
// - при натисканні кнопки 'Підказка': в полі Інпут з'являється правильна відповідь. В масив errorArray додається об'єкт з помилковою фразою. Масив shuffledArray знову перемішується (при цьому об'єкт з помилковою фразою не видаляється з нього)
// - коли об'єкти в масиві shuffledArray закінчуються, з'являється новий екран 'statistics': кількість фраз в масиві translations, кількість зроблених помилок, кнопка 'error correction'.
// -- при натисканні 'error correction' знову відкривається екран 'Test'. При цьому shuffledArray заповнюється унікальними об'єктами з масиву errorArray і перемішується. errorArray очищується. Тест продовжується за попереднім сценарієм.
// - тести продовжуються по колу поки не залишиться помилок. тоді з'являється екран з вітанням і кнопкою виходу на екран з таблицею
