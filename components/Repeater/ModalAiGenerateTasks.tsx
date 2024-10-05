import { Dispatch, SetStateAction } from 'react';
import { BaseButton } from '../TextButton/BaseButton';
import { generateAiText } from '@/libs/repeater/repeater.controller';
import { z } from 'zod';
import { FieldError, FieldErrorsImpl, Merge, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ETaskType, IGenerateAiSettings, promptModel } from '@/libs/repeater/repeater.model';
import { SeoSVG } from '../Svg/SeoSVG';

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
  label?: string;
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
    <div>
      {label && (
        <label htmlFor={id} className="block text-gray-500 text-sm mb-2">
          {label}
        </label>
      )}
      {type === 'radio' && options ? (
        <div className="w-full flex flex-wrap gap-4">
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
    setGeneratedData(generatedRes);
    setIsGenerateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600/80 flex items-center justify-center">
      <div className="max-h-screen max-w-lg overflow-y-auto w-full flex flex-wrap gap-4 bg-white p-6 rounded text-slate-600">
        <h2 className="w-full text-center text-xl font-bold">Select options</h2>

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

        <fieldset className="p-2 border rounded-md">
          <legend className="px-2 ml-2 text-stone-500 text-sm">Type of tasks</legend>
          <FormField
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

        <div className="flex justify-between items-end">
          <BaseButton
            ariaLabel="Close the modal window"
            className="flex justify-center items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsGenerateModalOpen(false)}
          >
            <SeoSVG strokeWidth={0.5} viewBox="0 0 24 24" className="w-4 h-4">
              <path
                fill="currentColor"
                d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2m0 2c-1.9 0-3.6.6-4.9 1.7l11.2 11.2c1-1.4 1.7-3.1 1.7-4.9c0-4.4-3.6-8-8-8m4.9 14.3L5.7 7.1C4.6 8.4 4 10.1 4 12c0 4.4 3.6 8 8 8c1.9 0 3.6-.6 4.9-1.7"
              />
            </SeoSVG>
            Cancel
          </BaseButton>
          <BaseButton
            ariaLabel="Start generating"
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
            className={`${isSubmitting ? 'bg-stone-400' : 'bg-blue-500'} flex justify-center items-center gap-2 text-white px-4 py-2 rounded`}
            onClick={handleSubmit(onSubmit)}
          >
            <SeoSVG strokeWidth={0.2} viewBox="0 0 14 14" className="w-4 h-4">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="m6.547 10.263l-2.81-2.81c.309-.517.617-1.052.922-1.584c1.016-1.766 2.008-3.49 2.938-4.387c2.524-2.524 5.981-1.06 5.981-1.06s1.463 3.457-1.06 5.981c-.89.922-2.587 1.9-4.34 2.908c-.546.315-1.097.632-1.631.952m2.14-6.532a1.582 1.582 0 1 1 3.164 0a1.582 1.582 0 0 1-3.163 0Zm-4.09-.232c-1.418-.377-2.749.321-3.93 1.404a.48.48 0 0 0 .089.765l1.905 1.148l.002-.004c.275-.46.582-.993.894-1.533c.355-.617.716-1.243 1.04-1.78m2.587 7.84l1.148 1.905a.48.48 0 0 0 .765.088c1.083-1.18 1.782-2.512 1.404-3.93c-.522.314-1.07.63-1.613.943l-.083.048c-.548.316-1.091.628-1.616.943zM2.622 9.343a2 2 0 0 1 1.402 3.46c-.222.212-.569.378-.89.506a11 11 0 0 1-1.1.358c-.367.1-.717.18-.982.233a6 6 0 0 1-.336.059l-.133.013a.5.5 0 0 1-.198-.022a.5.5 0 0 1-.241-.156a.5.5 0 0 1-.11-.22a.6.6 0 0 1-.012-.176c.003-.04.009-.086.015-.128c.013-.088.033-.203.06-.334c.053-.264.135-.612.235-.977c.1-.364.222-.754.359-1.095c.128-.321.294-.667.506-.888a2 2 0 0 1 1.425-.633"
                clipRule="evenodd"
              />
            </SeoSVG>
            {isSubmitting ? (
              <span className="cursor-wait">Generating...</span>
            ) : (
              <span>Generate</span>
            )}
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
