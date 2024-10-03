import { Dispatch, SetStateAction, useState } from 'react';
import { ETaskType } from './DictionaryPage';
import { BaseButton } from '../TextButton/BaseButton';
import { generateAiText } from '@/libs/repeater/repeater.controller';

interface IProps {
  isEditMode: boolean;
  closeModal: () => void;
  saveTranslation: () => void;
  setNewEnglish: (e: string) => void;
  setNewUkrainian: (e: string) => void;
  newEnglish: string;
  newUkrainian: string;
}

export const ModalAddRepeaterTask = ({
  isEditMode,
  closeModal,
  saveTranslation,
  setNewEnglish,
  setNewUkrainian,
  newEnglish,
  newUkrainian,
}: IProps) => (
  <div className="fixed inset-0 bg-gray-600/80 flex items-center justify-center">
    <div className="bg-white p-6 rounded text-slate-600">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? 'Edit Translation' : 'Add Translation'}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-500 text-sm mb-2">English</label>
        <input
          type="text"
          className="border bg-white px-4 py-2 w-full"
          value={newEnglish}
          onChange={(e) => setNewEnglish(e.target.value.trim())}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-500 text-sm mb-2">Ukrainian</label>
        <input
          type="text"
          className="border bg-white px-4 py-2 w-full"
          value={newUkrainian}
          onChange={(e) => setNewUkrainian(e.target.value.trim())}
        />
      </div>

      <div className="flex justify-between">
        <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={closeModal}>
          Cancel
        </button>
        <button
          aria-disabled={newEnglish.length === 0 || newUkrainian.length === 0}
          disabled={newEnglish.length === 0 || newUkrainian.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={saveTranslation}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

interface IGenerateAiProps {
  setIsGenerateModalOpen: Dispatch<SetStateAction<boolean>>;
  setGeneratedData: (lessons: string[][] | null) => void;
}

export const ModalGenerateTasks = ({
  setIsGenerateModalOpen,
  setGeneratedData,
}: IGenerateAiProps) => {
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [formData, setFormData] = useState({
    level: 1,
    quantity: 1,
    type: ETaskType.phrases,
    topic: '',
  });

  const handleChange = ({ name, value }: EventTarget & (HTMLInputElement | HTMLSelectElement)) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitClicked(true);
    const generatedRes = await generateAiText(formData);
    setGeneratedData(generatedRes);
    setIsGenerateModalOpen(false);
    setIsSubmitClicked(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/80 flex items-center justify-center">
      <div className="bg-white p-6 rounded text-slate-600">
        <h2 className="text-xl font-bold mb-4">Select options</h2>

        <div className="mb-4">
          <label htmlFor="level" className="block text-gray-500 text-sm mb-2">
            Level (1-10)
          </label>
          <input
            type="number"
            name="level"
            id="level"
            min={1}
            max={10}
            className="border bg-white px-4 py-2 w-full"
            value={formData.level}
            onChange={(e) => handleChange(e.target)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-500 text-sm mb-2">
            Quantity (1-20)
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min={1}
            max={20}
            className="border bg-white px-4 py-2 w-full"
            value={formData.quantity}
            onChange={(e) => handleChange(e.target)}
          />
        </div>

        <fieldset className="flex flex-col gap-2 p-2 mb-4 border rounded-md">
          <legend className={'px-2 ml-4 text-stone-500 text-sm'}>Type of tasks</legend>
          <label
            className={`${formData.type === ETaskType.words ? 'bg-stone-200' : ''} flex gap-2 cursor-pointer`}
          >
            <input
              name="type"
              type="radio"
              value={ETaskType.words}
              checked={formData.type === ETaskType.words}
              onChange={(e) => handleChange(e.target)}
            />
            Words
          </label>
          <label
            className={`${formData.type === ETaskType.phrases ? 'bg-stone-200' : ''} flex gap-2 cursor-pointer`}
          >
            <input
              name="type"
              type="radio"
              value={ETaskType.phrases}
              checked={formData.type === ETaskType.phrases}
              onChange={(e) => handleChange(e.target)}
            />
            Phrases
          </label>
          <label
            className={`${formData.type === ETaskType.sentences ? 'bg-stone-200' : ''} flex gap-2 cursor-pointer`}
          >
            <input
              name="type"
              type="radio"
              value={ETaskType.sentences}
              checked={formData.type === ETaskType.sentences}
              onChange={(e) => handleChange(e.target)}
            />
            Sentences
          </label>
        </fieldset>

        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Topic</label>
          <input
            type="text"
            name="topic"
            id="topic"
            min={2}
            max={50}
            className="border bg-white px-4 py-2 w-full"
            value={formData.topic}
            onChange={(e) => handleChange(e.target)}
          />
        </div>

        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsGenerateModalOpen(false)}
          >
            Cancel
          </button>
          <BaseButton
            ariaLabel="Start generating"
            aria-disabled={isSubmitClicked}
            disabled={isSubmitClicked}
            className={`${isSubmitClicked ? 'bg-stone-500' : 'bg-blue-500'} text-white px-4 py-2 rounded`}
            onClick={handleSubmit}
          >
            {isSubmitClicked ? (
              <span className="cursor-wait">Generating...</span>
            ) : (
              <span>Start</span>
            )}
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export const ModalDeleteTask = ({
  closeDeleteModal,
  confirmDelete,
}: {
  closeDeleteModal: () => void;
  confirmDelete: () => void;
}) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg text-slate-600">
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this row?</p>
      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={closeDeleteModal}
        >
          Cancel
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDelete}>
          Delete
        </button>
      </div>
    </div>
  </div>
);
