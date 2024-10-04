import { Dispatch, SetStateAction } from 'react';
import { BaseButton } from '../TextButton/BaseButton';
import { generateAiText } from '@/libs/repeater/repeater.controller';
import { z } from 'zod';
import { FieldError, FieldErrorsImpl, Merge, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ETaskType, IGenerateAiSettings, promptModel } from '@/libs/repeater/repeater.model';

interface IGenerateAiProps {
  setIsGenerateModalOpen: Dispatch<SetStateAction<boolean>>;
  setGeneratedData: (lessons: string[][] | null) => void;
}

type TValidFieldNames = 'level' | 'quantity' | 'taskType' | 'topic';

const taskTypes = Object.values(ETaskType) as [ETaskType, ...ETaskType[]];

const { maxLevel, maxTaskGeneration } = promptModel;

const generateTaskSchema = z.object({
  level: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z
      .number({
        required_error: 'Level is required',
        invalid_type_error: 'Please enter a number',
      })
      .min(1, 'Level must be at least 1')
      .max(maxLevel, `Level cannot be more than ${maxLevel}`)
  ),
  quantity: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Please enter a number',
      })
      .min(1, 'Quantity must be at least 1')
      .max(maxTaskGeneration, `Quantity cannot be more than ${maxTaskGeneration}`)
  ),
  taskType: z.enum(taskTypes),
  topic: z.union([
    z.literal(''),
    z
      .string()
      .min(2, 'Topic must be at least 2 characters')
      .max(50, 'Topic cannot exceed 50 characters')
      .trim(),
  ]),
});

interface FormFieldProps {
  label: string;
  type: 'text' | 'number' | 'radio';
  id: TValidFieldNames;
  register: UseFormRegister<IGenerateAiSettings>;
  placeholder?: string;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<IGenerateAiSettings>>;
  options?: { value: string; label: string }[]; // for radio inputs
  valueAsNumber?: boolean;
}

const FormField = ({
  label,
  type,
  id,
  register,
  error,
  options,
  valueAsNumber,
  placeholder,
}: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-500 text-sm mb-2">
        {label}
      </label>
      {type === 'radio' && options ? (
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label key={option.value} className="flex gap-2 cursor-pointer">
              <input type="radio" value={option.value} {...register(id)} />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          type={type}
          id={id}
          {...register(id, { valueAsNumber })}
          placeholder={placeholder}
          className="border bg-white px-4 py-2 w-full"
        />
      )}
      {error && <span className="text-red-500 text-sm">{error.toString()}</span>}
    </div>
  );
};

export const ModalAiGenerateTasks = ({
  setIsGenerateModalOpen,
  setGeneratedData,
}: IGenerateAiProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IGenerateAiSettings>({
    defaultValues: {
      taskType: ETaskType.words, // Значення за замовчуванням для поля "taskType"
      level: 3,
      quantity: 5,
      topic: '',
    },
    resolver: zodResolver(generateTaskSchema), // Валідація через Zod
  });
  const onSubmit = async (formData: IGenerateAiSettings) => {
    const generatedRes = await generateAiText(formData);
    if (typeof generatedRes === 'string' || typeof generatedRes === 'undefined') {
      console.log('🚀 ~ onSubmit ~ generatedRes:', generatedRes);
    } else {
      setGeneratedData(generatedRes);
    }
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/80 flex items-center justify-center">
      <div className="bg-white p-6 rounded text-slate-600">
        <h2 className="text-xl font-bold mb-4">Select options</h2>

        <FormField
          valueAsNumber
          placeholder="1-10"
          label="Level (1-10)"
          type="number"
          id="level"
          register={register}
          error={errors.level?.message}
        />

        <FormField
          valueAsNumber
          placeholder="1-20"
          label="Quantity (1-20)"
          type="number"
          id="quantity"
          register={register}
          error={errors.quantity?.message}
        />

        <fieldset className="flex flex-col gap-2 p-2 mb-4 border rounded-md">
          <legend className="px-2 ml-4 text-stone-500 text-sm">Type of tasks</legend>
          <FormField
            label="Task Type"
            type="radio"
            id="taskType"
            register={register}
            options={[
              { value: ETaskType.words, label: 'Words' },
              { value: ETaskType.phrases, label: 'Phrases' },
              { value: ETaskType.sentences, label: 'Sentences' },
            ]}
            error={errors.taskType?.message}
          />
        </fieldset>

        <FormField
          label="Topic"
          placeholder='e.g., "airport"'
          type="text"
          id="topic"
          register={register}
          error={errors.topic?.message}
        />

        <div className="flex justify-between">
          <BaseButton
            ariaLabel="Close the modal window"
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsGenerateModalOpen(false)}
          >
            Cancel
          </BaseButton>
          <BaseButton
            ariaLabel="Start generating"
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
            className={`${isSubmitting ? 'bg-stone-500' : 'bg-blue-500'} text-white px-4 py-2 rounded`}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? <span className="cursor-wait">Generating...</span> : <span>Start</span>}
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
