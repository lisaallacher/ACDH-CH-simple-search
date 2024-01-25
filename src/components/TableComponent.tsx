import React from 'react';
import { mmpData } from './types';

/**
 * props for the TableComponent that are mmpData  Array of MMP data and searchLimit string
 * @interface
 */
interface TableComponentProps {
  mmpData: mmpData[];
  searchLimit: string;
}
/**
 * table component for displaying MMP data
 * @component
 * @param {TableComponentProps} props props for the TableComponent
 * @returns {React.ReactElement} - JSX Element representing the TableComponent
 */
const TableComponent: React.FC<TableComponentProps> = ({ mmpData, searchLimit }) => {

  /**
   * handles user click on a table entry
   * @param {number} entryId - ID of the clicked entry
   * @returns {void}
   */
  const handleUserClick = (entryId: number) => {
    // Open new tab and navigate to entry details
    window.open(`/details/${entryId}`, '_blank');
  };

  return (
 <div className='md:max-xl:flex'>
  <div className='mx-20'><p className='mb-4'>Total Search Results: {searchLimit}</p></div>
  <div className='overflow-x-auto'>
    <table className='table-auto border-collapse w-full max-w-screen-2xl mx-auto mb-3'>
      <thead>
        <tr className='text-white bg-slate-500'>
          <th className='border border-slate-600 p-2'>Row Number</th>
          <th className='border border-slate-600 p-2'>ID</th>
          <th className='border border-slate-600 p-2'>Title</th>
          <th className='border border-slate-600 p-2'>Zitat Stelle</th>
          <th className='border border-slate-600 p-2'>Zitat</th>
          <th className='border border-slate-600 p-2'>Display Label</th>
          <th className='border border-slate-600 p-2'>Keywords</th>
          <th className='border border-slate-600 p-2'>Date Range</th>
          <th className='border border-slate-600 p-2'>Authors</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(mmpData) &&
          mmpData.map((entry, index) => (
            <tr key={entry.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className='border border-slate-600 p-2'>Nr. {index + 1}</td>
              <td className='border border-slate-600 p-2'>{entry.id}</td>
              <td
                className='border border-slate-600 p-2 cursor-pointer text-blue-500 underline'
                onClick={() => handleUserClick(entry.id)}
              >
                {entry.text.title}
              </td>
              <td className='border border-slate-600 p-2 text-sm'>{entry.zitat_stelle}</td>
              <td className='border border-slate-600 p-2'>{entry.zitat}</td>
              <td className='border border-slate-600 p-2'>{entry.display_label}</td>
              <td className='border border-slate-600 p-2'>
                {entry.key_word.map((k_item) => (
                  <span key={k_item.id}>{k_item.stichwort}, </span>
                ))}
              </td>
              <td className='border border-slate-600 p-2'>{entry.text.start_date} - {entry.text.end_date}</td>
              <td className='border border-slate-600 p-2'>
                {entry.text.autor.map((author, authorIndex) => (
                  <span key={author.id}>
                    {author.name}
                    {authorIndex < entry.text.autor.length - 1 && ', '}
                  </span>
                ))}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>


  );
};

export default TableComponent;
