'use client';

import { DictionaryPage } from '@/components/Repeater/DictionaryPage';
import { RepeaterTestPage } from '@/components/Repeater/RepeaterTestPage';
import { ITranslation } from '@/libs/repeater/repeater.model';
import { useState } from 'react';

const Page = () => {
  const [translations, setTranslations] = useState<ITranslation[]>([]);
  const [isTestStarted, setIsTestStarted] = useState(false);

  const startTest = () => {
    setIsTestStarted(true);
  };

  return !isTestStarted ? (
    <DictionaryPage
      translations={translations}
      setTranslations={setTranslations}
      startTest={startTest}
    />
  ) : (
    <RepeaterTestPage
      translations={translations}
      setIsTestStarted={setIsTestStarted}
      translationsLength={translations.length}
    />
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
