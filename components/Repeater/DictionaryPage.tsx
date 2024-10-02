import { ITranslation } from '@/app/[lang]/repeater/page';
import { BaseButton } from '../TextButton/BaseButton';
import { SeoSVG } from '../Svg/SeoSVG';
import { Title } from '../Title/Title';
import { Dispatch, SetStateAction, useState } from 'react';
import { ModalAddRepeaterTask, ModalDeleteTask } from './ModalAddRepeaterTask';

interface IProps {
  translations: ITranslation[];
  setTranslations: Dispatch<SetStateAction<ITranslation[]>>;
  startTest: () => void;
}

export const DictionaryPage = ({ translations, setTranslations, startTest }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState<ITranslation | null>(null);

  const [newEnglish, setNewEnglish] = useState('');
  const [newUkrainian, setNewUkrainian] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Модальне вікно для підтвердження видалення
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID рядка, який будемо видаляти

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
            ? { ...item, english: newEnglish.trim(), ukrainian: newUkrainian.trim() }
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
        {translations.length > 0 && (
          <>
            <p className="p-4">
              TOTAL: <span className="text-teal-300 text-xl">{translations.length}</span> phrases
            </p>
            <table className="table-auto w-full text-slate-50">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-stone-400">English</th>
                  <th className="px-4 py-2 border border-stone-400">Ukrainian</th>
                  <th className="px-4 py-2 border border-stone-400">Delete</th>
                </tr>
              </thead>
              <tbody>
                {translations.map((translation) => (
                  <tr key={translation.id}>
                    <td
                      className="px-4 py-2 border border-stone-400 cursor-pointer"
                      onClick={() => openModal(translation)}
                    >
                      {translation.english}
                    </td>
                    <td
                      className="px-4 py-2 border border-stone-400 cursor-pointer"
                      onClick={() => openModal(translation)}
                    >
                      {translation.ukrainian}
                    </td>
                    <td className="px-4 py-2 border border-stone-400 text-center">
                      <BaseButton
                        ariaLabel="Delete item from translation table"
                        className="text-red-500 hover:text-red-400 font-bold text-center p-1 rounded-full bg-yellow-50/70 hover:bg-yellow-50/30"
                        onClick={() => openDeleteModal(translation.id)}
                      >
                        <SeoSVG strokeWidth={0.1}>
                          <path
                            fill="currentColor"
                            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                          />
                        </SeoSVG>
                      </BaseButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="w-full flex items-center justify-around p-4">
          <BaseButton
            ariaLabel="Add item to translation table"
            className="group drop-shadow-md"
            onClick={() => openModal()}
          >
            <SeoSVG
              strokeWidth={0.2}
              className="w-12 h-12 text-green-300 group-hover:text-green-400"
            >
              <path
                fill="currentColor"
                d="M14 14q.425 0 .713-.288T15 13v-2h2q.425 0 .713-.288T18 10t-.288-.712T17 9h-2V7q0-.425-.288-.712T14 6t-.712.288T13 7v2h-2q-.425 0-.712.288T10 10t.288.713T11 11h2v2q0 .425.288.713T14 14m-6 4q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6t.713.288T4 7v13h13q.425 0 .713.288T18 21t-.288.713T17 22z"
              />
            </SeoSVG>
            <span className="text-xs text-green-200 group-hover:text-green-50">add task</span>
          </BaseButton>

          {translations.length > 0 && (
            <BaseButton
              ariaLabel="Start the test according to the dictionary"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => startTest()}
            >
              <SeoSVG strokeWidth={0.2} viewBox="0 0 14 14" className="w-6 h-6 inline-block pr-2">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m6.547 10.263l-2.81-2.81c.309-.517.617-1.052.922-1.584c1.016-1.766 2.008-3.49 2.938-4.387c2.524-2.524 5.981-1.06 5.981-1.06s1.463 3.457-1.06 5.981c-.89.922-2.587 1.9-4.34 2.908c-.546.315-1.097.632-1.631.952m2.14-6.532a1.582 1.582 0 1 1 3.164 0a1.582 1.582 0 0 1-3.163 0Zm-4.09-.232c-1.418-.377-2.749.321-3.93 1.404a.48.48 0 0 0 .089.765l1.905 1.148l.002-.004c.275-.46.582-.993.894-1.533c.355-.617.716-1.243 1.04-1.78m2.587 7.84l1.148 1.905a.48.48 0 0 0 .765.088c1.083-1.18 1.782-2.512 1.404-3.93c-.522.314-1.07.63-1.613.943l-.083.048c-.548.316-1.091.628-1.616.943zM2.622 9.343a2 2 0 0 1 1.402 3.46c-.222.212-.569.378-.89.506a11 11 0 0 1-1.1.358c-.367.1-.717.18-.982.233a6 6 0 0 1-.336.059l-.133.013a.5.5 0 0 1-.198-.022a.5.5 0 0 1-.241-.156a.5.5 0 0 1-.11-.22a.6.6 0 0 1-.012-.176c.003-.04.009-.086.015-.128c.013-.088.033-.203.06-.334c.053-.264.135-.612.235-.977c.1-.364.222-.754.359-1.095c.128-.321.294-.667.506-.888a2 2 0 0 1 1.425-.633"
                  clipRule="evenodd"
                />
              </SeoSVG>
              Start Test
            </BaseButton>
          )}
        </div>

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
      </article>
    </>
  );
};
