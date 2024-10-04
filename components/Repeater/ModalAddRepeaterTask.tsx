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
    <div className="mb-4">
      <label className="block text-gray-500 text-sm mb-2">{labelTitle}</label>
      <input
        type="text"
        className="border bg-white px-4 py-2 w-full"
        value={value}
        onChange={(e) => onChangeFn(e.target.value.trim())}
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
  <div className="fixed inset-0 bg-gray-600/80 flex items-center justify-center">
    <div className="bg-white p-6 rounded text-slate-600">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? 'Edit Translation' : 'Add Translation'}
      </h2>

      <InputField labelTitle="English" value={newEnglish} onChangeFn={setNewEnglish} />

      <InputField
        labelTitle="Transcription"
        value={newTranscription}
        onChangeFn={setNewTranscription}
      />

      <InputField labelTitle="Ukrainian" value={newUkrainian} onChangeFn={setNewUkrainian} />

      <div className="flex justify-between">
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
    </div>
  </div>
);

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
