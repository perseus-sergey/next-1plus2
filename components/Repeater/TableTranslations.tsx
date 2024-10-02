import { ITranslation } from '@/app/[lang]/repeater/page';
import { BaseButton } from '../TextButton/BaseButton';
import { SeoSVG } from '../Svg/SeoSVG';

interface IProps {
  translations: ITranslation[];
  openModal: (translation: ITranslation) => void;
  openDeleteModal: (id: number) => void;
}

export const TableTranslations = ({ translations, openModal, openDeleteModal }: IProps) => (
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
);
