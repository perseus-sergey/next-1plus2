import { ReactNode } from 'react';
import { SeoSVG } from '../Svg/SeoSVG';
import { BaseButton } from '../TextButton/BaseButton';

interface IProps {
  isEditMode: boolean;
  closeModal: () => void;
  saveTranslation: () => void;
  setNewEnglish: (e: string) => void;
  setNewTranscription: (e: string) => void;
  setNewUkrainian: (e: string) => void;
  newEnglish: string;
  newUkrainian: string;
  newTranscription: string;
}

const InputField = ({
  value,
  onChangeFn,
  labelTitle,
}: {
  value: string;
  onChangeFn: (e: string) => void;
  labelTitle: string;
}) => {
  return (
    <div className="w-full">
      <label className="block text-gray-500 mb-1">{labelTitle}</label>
      <input
        type="text"
        className="border bg-white px-4 py-2 w-full"
        value={value}
        onChange={(e) => onChangeFn(e.target.value)}
      />
    </div>
  );
};

export const ModalAddRepeaterTask = ({
  isEditMode,
  closeModal,
  saveTranslation,
  setNewEnglish,
  setNewTranscription,
  setNewUkrainian,
  newEnglish,
  newUkrainian,
  newTranscription,
}: IProps) => (
  <ModalWrapper title={isEditMode ? 'Edit Task' : 'Add Task'} closeFn={closeModal}>
    {isEditMode ? (
      <SeoSVG
        strokeWidth={0.2}
        viewBox="0 0 24 24"
        className="absolute top-4 left-4 w-8 h-8 text-slate-400"
      >
        <path
          fill="currentColor"
          d="M3 6v2h11V6zm0 4v2h11v-2zm17 .1c-.1 0-.3.1-.4.2l-1 1l2.1 2.1l1-1c.2-.2.2-.6 0-.8l-1.3-1.3c-.1-.1-.2-.2-.4-.2m-1.9 1.8l-6.1 6V20h2.1l6.1-6.1zM3 14v2h7v-2z"
        />
      </SeoSVG>
    ) : (
      <SeoSVG
        strokeWidth={2}
        viewBox="0 0 24 24"
        className="absolute top-4 left-4 w-8 h-8 text-slate-400"
      >
        <path d="M19 10H5m0-4h14m-5 8H5m0 4h6m7-3v6m-3-3h6" />
      </SeoSVG>
    )}

    <InputField labelTitle="Ask" value={newUkrainian} onChangeFn={setNewUkrainian} />

    <InputField
      labelTitle="Transcription"
      value={newTranscription}
      onChangeFn={setNewTranscription}
    />

    <InputField labelTitle="Answer" value={newEnglish} onChangeFn={setNewEnglish} />

    <div className="flex justify-between items-end">
      <BaseButton
        ariaLabel="Close the modal window"
        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        onClick={closeModal}
      >
        Cancel
      </BaseButton>

      <BaseButton
        ariaLabel="Save phrases to dictionary"
        aria-disabled={newEnglish.length === 0 || newUkrainian.length === 0}
        disabled={newEnglish.length === 0 || newUkrainian.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={saveTranslation}
      >
        Save
      </BaseButton>
    </div>
  </ModalWrapper>
);

export const ModalDeleteTask = ({
  closeDeleteModal,
  confirmDelete,
  isDeleteAll = false,
}: {
  closeDeleteModal: () => void;
  confirmDelete: () => void;
  isDeleteAll: boolean;
}) => (
  <ModalWrapper title="Confirm Deletion" closeFn={closeDeleteModal}>
    <p>Are you sure you want to delete {isDeleteAll ? 'ALL TASKS' : 'this task'}?</p>
    <div className="flex justify-end mt-4">
      <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={closeDeleteModal}>
        Cancel
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDelete}>
        Delete
      </button>
    </div>
  </ModalWrapper>
);

export const ModalWrapper = ({
  title,
  children,
  closeFn,
}: {
  title: string;
  children: ReactNode;
  closeFn: () => void;
}) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="relative max-h-screen max-w-lg overflow-y-auto w-full flex flex-wrap gap-4 bg-white p-6 rounded text-xl text-slate-600">
      <h2 className="w-full text-center text-3xl font-bold mb-4">{title}</h2>
      {children}
      <BaseButton
        ariaLabel="Close the modal window"
        className="absolute top-2 right-2 text-5xl font-extralight text-slate-400 rotate-45"
        onClick={() => closeFn()}
      >
        +
      </BaseButton>
    </div>
  </div>
);
