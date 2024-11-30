'use client';

import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BaseButton } from '../TextButton/BaseButton';
import { SeoSVG } from '../Svg/SeoSVG';
import { ModalAddRepeaterTask, ModalDeleteTask } from './ModalAddRepeaterTask';
import { ModalAiGenerateTasks } from './ModalAiGenerateTasks';
import { ELang } from '@models/types';
import { ITranslation, REPEATER_PAGE_TEXT } from '@/models/repeater.model';
import ArticleWithImage from '../ArticleWithImage';

import repeaterImg from 'public/img/repeater_300.jpg';
import ArticleWrapper from '../ArticleWrapper';
import ExitButtonWithModal from '../TextButton/ExitButtonWithModal';
import LazyAppearing from '../intersection/LazyAppearing';

interface IProps {
  translations: ITranslation[];
  setTranslations: Dispatch<SetStateAction<ITranslation[]>>;
  startTest: () => void;
  lang: ELang;
}

const btnBaseStyle =
  'w-fit flex items-center gap-4 justify-center text-xl text-white p-4 sm:py-2 rounded-lg sm:rounded';
const svgBaseStyle = 'w-8 h-8';

export const DictionaryPage = ({ translations, setTranslations, startTest, lang }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<ITranslation | null>(null);

  const [newEnglish, setNewEnglish] = useState('');
  const [newTranscription, setNewTranscription] = useState('');
  const [newUkrainian, setNewUkrainian] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | 'all' | null>(null);

  const [generatedData, setGeneratedData] = useState<string[][] | null>([]);
  const router = useRouter();

  const openModal = (translation?: ITranslation) => {
    if (translation) {
      setIsEditMode(true);
      setCurrentTranslation(translation);
      setNewEnglish(translation.english);
      setNewTranscription(translation.transcription || '');
      setNewUkrainian(translation.ukrainian);
    } else {
      setIsEditMode(false);
      setNewEnglish('');
      setNewTranscription('');
      setNewUkrainian('');
    }
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentTranslation(null);
  }, []);

  const saveTranslation = useCallback(() => {
    const newEngTrimmed = newEnglish.trim();
    const newUkrTrimmed = newUkrainian.trim();

    if (!newEngTrimmed || !newUkrTrimmed) {
      return;
    }

    if (isEditMode && currentTranslation) {
      // Редагування існуючого перекладу
      setTranslations((prev) =>
        prev.map((item) =>
          item.id === currentTranslation.id
            ? {
                ...item,
                english: newEngTrimmed,
                transcription: newTranscription.trim(),
                ukrainian: newUkrTrimmed,
              }
            : item
        )
      );
    } else {
      // Додавання нового перекладу
      setTranslations((prev) => [
        ...prev,
        {
          id: prev.length ? prev[prev.length - 1].id + 1 : 1, // Генеруємо новий ID
          english: newEngTrimmed,
          transcription: newTranscription.trim(),
          ukrainian: newUkrTrimmed,
        },
      ]);
    }

    closeModal(); // Закриваємо модальне вікно
  }, [
    isEditMode,
    currentTranslation,
    newEnglish,
    newTranscription,
    newUkrainian,
    setTranslations,
    closeModal,
  ]);

  useEffect(() => {
    if (!generatedData || generatedData.length === 0) return;

    const newId = translations.length ? translations[translations.length - 1].id + 1 : 1;

    setTranslations([
      ...translations,
      ...generatedData.map((item, idx) => ({
        id: newId + idx,
        english: item[0],
        transcription: item[1].replace(/^\/|\/$/g, ''),
        ukrainian: item[2],
      })),
    ]);
  }, [generatedData]);

  const openDeleteModal = (id: number | 'all') => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = useCallback(() => {
    if (deleteId === null) {
      closeDeleteModal();
      return;
    }

    if (deleteId === 'all') {
      setTranslations([]);
    } else {
      setTranslations((prev) => prev.filter((item) => item.id !== deleteId));
    }
    closeDeleteModal();
  }, [deleteId]);

  const closeDeleteModal = useCallback(() => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  }, []);

  const handleEndTest = () => {
    router.push(`/${lang}`);
  };

  return (
    <>
      <ExitButtonWithModal
        className="self-start pl-1 sm:pl-4"
        lang={lang}
        modalText={
          lang === 'ua'
            ? 'Ви дійсно впевнені що бажаєте залишити цю сторінку?'
            : 'Are you sure you want to leave this page?'
        }
        confirmBtnTitle={lang === 'ua' ? 'Вийти' : 'Leave'}
        exitHandler={() => handleEndTest()}
        ariaLabel={
          lang === 'ua'
            ? 'Залишити цю сторінку і повернутися до домашньої'
            : 'Finish this page and come back to home'
        }
      />

      {translations.length > 0 ? (
        <>
          <ArticleWrapper h1Title={lang === 'ua' ? 'Словник' : 'Dictionary'}>
            <p className="p-4">
              TOTAL: <span className="text-teal-300 text-xl">{translations.length}</span> phrases
            </p>

            <ul className="flex flex-col gap-2 min-w-72 text-xl">
              {translations.map((translation) => (
                <li key={translation.id} className="flex gap-2 p-2 bg-slate-900/60">
                  <ul className="w-full flex flex-col gap-3" onClick={() => openModal(translation)}>
                    <li className="bg-blue-900 p-1 sm:px-4">{translation.english}</li>
                    {translation.transcription && (
                      <li className="bg-gray-700 p-1 sm:px-4 text-center">
                        {translation.transcription}
                      </li>
                    )}
                    <li className="bg-sky-900 p-1 sm:px-4">{translation.ukrainian}</li>
                  </ul>
                  <div className="ml-auto shrink-0 w-12 flex items-center justify-end border-l border-slate-300">
                    <BaseButton
                      ariaLabel="Delete item from translation table"
                      className="bg-red-700 hover:bg-red-600 font-bold text-center p-1 rounded-full"
                      onClick={() => openDeleteModal(translation.id)}
                    >
                      <SeoSVG strokeWidth={0.1}>
                        <path
                          fill="currentColor"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                        />
                      </SeoSVG>
                    </BaseButton>
                  </div>
                </li>
              ))}
            </ul>
          </ArticleWrapper>
        </>
      ) : (
        <ArticleWithImage
          titleH1={lang === 'ua' ? 'Словник' : 'Dictionary'}
          imgSrc={repeaterImg}
          imgAlt={
            lang === 'ua'
              ? 'Ілюстрація веселої сцени вивчення мов із бульбашками тексту та дружнім AI-помічником.'
              : 'Illustration of a playful language learning scene with speech bubbles and a friendly AI assistant.'
          }
          innerHtml={REPEATER_PAGE_TEXT[lang]}
        />
      )}

      <div className="w-64 sm:w-fit grid grid-cols-2 flex-wrap items-center gap-8 justify-items-center sm:py-12 py-6 px-2">
        <LazyAppearing transformDirection="right">
          <BaseButton
            ariaLabel="Add item to translation table"
            className={`${btnBaseStyle} bg-orange-500 hover:bg-orange-600`}
            onClick={() => openModal()}
          >
            <SeoSVG strokeWidth={0.2} className={svgBaseStyle}>
              <path
                fill="currentColor"
                d="M14 14q.425 0 .713-.288T15 13v-2h2q.425 0 .713-.288T18 10t-.288-.712T17 9h-2V7q0-.425-.288-.712T14 6t-.712.288T13 7v2h-2q-.425 0-.712.288T10 10t.288.713T11 11h2v2q0 .425.288.713T14 14m-6 4q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6t.713.288T4 7v13h13q.425 0 .713.288T18 21t-.288.713T17 22z"
              />
            </SeoSVG>
            <span className="hidden sm:block">add task</span>
          </BaseButton>
        </LazyAppearing>

        <LazyAppearing transformDirection="left">
          <BaseButton
            ariaLabel="Generate tasks"
            className={`${btnBaseStyle} bg-green-500 hover:bg-green-600`}
            onClick={() => setIsGenerateModalOpen(true)}
          >
            <SeoSVG viewBox="0 0 32 32" className={svgBaseStyle}>
              <path
                fill="currentColor"
                d="M19 22v-2h1v-7h-1v-2h4v2h-1v7h1v2zm-3.5 0h2L14 11h-3L7.503 22h2l.601-2h4.778zm-4.794-4l1.628-5.411l.256-.003L14.264 18zM32 4h-4V0h-2v4h-4v2h4v4h2V6h4zm-2 8h2v2h-2zM18 0h2v2h-2z"
              />
              <path fill="currentColor" d="M32 32H0V0h14v2H2v28h28V18h2z" />
            </SeoSVG>
            <span className="sm:block hidden">Generate</span>
          </BaseButton>
        </LazyAppearing>

        {translations.length > 0 && (
          <>
            <BaseButton
              ariaLabel="Delete all tasks from translation table"
              className={`${btnBaseStyle} bg-red-500 hover:bg-red-600`}
              onClick={() => openDeleteModal('all')}
            >
              <SeoSVG strokeWidth={0.1} className={svgBaseStyle}>
                <path
                  fill="currentColor"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                />
              </SeoSVG>
              <span className="sm:block hidden">Delete All</span>
            </BaseButton>

            <BaseButton
              ariaLabel="Start the test according to the dictionary"
              className={`${btnBaseStyle} bg-blue-500 hover:bg-blue-600`}
              onClick={() => startTest()}
            >
              <SeoSVG strokeWidth={0.2} viewBox="0 0 14 14" className={svgBaseStyle}>
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m6.547 10.263l-2.81-2.81c.309-.517.617-1.052.922-1.584c1.016-1.766 2.008-3.49 2.938-4.387c2.524-2.524 5.981-1.06 5.981-1.06s1.463 3.457-1.06 5.981c-.89.922-2.587 1.9-4.34 2.908c-.546.315-1.097.632-1.631.952m2.14-6.532a1.582 1.582 0 1 1 3.164 0a1.582 1.582 0 0 1-3.163 0Zm-4.09-.232c-1.418-.377-2.749.321-3.93 1.404a.48.48 0 0 0 .089.765l1.905 1.148l.002-.004c.275-.46.582-.993.894-1.533c.355-.617.716-1.243 1.04-1.78m2.587 7.84l1.148 1.905a.48.48 0 0 0 .765.088c1.083-1.18 1.782-2.512 1.404-3.93c-.522.314-1.07.63-1.613.943l-.083.048c-.548.316-1.091.628-1.616.943zM2.622 9.343a2 2 0 0 1 1.402 3.46c-.222.212-.569.378-.89.506a11 11 0 0 1-1.1.358c-.367.1-.717.18-.982.233a6 6 0 0 1-.336.059l-.133.013a.5.5 0 0 1-.198-.022a.5.5 0 0 1-.241-.156a.5.5 0 0 1-.11-.22a.6.6 0 0 1-.012-.176c.003-.04.009-.086.015-.128c.013-.088.033-.203.06-.334c.053-.264.135-.612.235-.977c.1-.364.222-.754.359-1.095c.128-.321.294-.667.506-.888a2 2 0 0 1 1.425-.633"
                  clipRule="evenodd"
                />
              </SeoSVG>
              <span className="sm:block hidden">Start Test</span>
            </BaseButton>
          </>
        )}
      </div>
      {!generatedData && (
        <p className="bg-red-600 p-2">Failed to load data. Please try again later.</p>
      )}

      {isModalOpen && (
        <ModalAddRepeaterTask
          lang={lang}
          isEditMode={isEditMode}
          closeModal={closeModal}
          saveTranslation={saveTranslation}
          newEnglish={newEnglish}
          newUkrainian={newUkrainian}
          setNewEnglish={setNewEnglish}
          setNewTranscription={setNewTranscription}
          newTranscription={newTranscription}
          setNewUkrainian={setNewUkrainian}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDeleteTask
          lang={lang}
          closeDeleteModal={closeDeleteModal}
          confirmDelete={confirmDelete}
          isDeleteAll={deleteId === 'all'}
        />
      )}

      {isGenerateModalOpen && (
        <ModalAiGenerateTasks
          lang={lang}
          setGeneratedData={setGeneratedData}
          setIsGenerateModalOpen={setIsGenerateModalOpen}
        />
      )}
    </>
  );
};

export default React.memo(DictionaryPage);
