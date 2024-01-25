import React, { useState } from 'react';
import { writePagnationToSessionStorage } from './utils/pagnationStorageFunctions';
import { PagnationObject } from './types';
/**
 * Props for the Search component with strings for searchTerm and Limit
 * @interface
 */
interface SearchProps {
  onSearchSubmit: (searchTerm: string, limit: string) => void;
}
/**
 * search component for searching citations
 * @component
 * @param {SearchProps} props - props for the Search component
 * @returns {React.ReactElement} - JSX Element representing the Search component
 */
const Search: React.FC<SearchProps> = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState('20');
/**
   * handles input change for search term
   * @param {React.ChangeEvent<HTMLInputElement>} event - input change event
   * @returns {void}
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * handles input change for search limit
   * @param {React.ChangeEvent<HTMLInputElement>} event - input change event
   * @returns {void}
   */
 const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(event.target.value);
  };

    /**
   * handles form submission for search
   * @param {React.FormEvent<HTMLFormElement>} event - form submission event
   * @returns {void}
   */
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const shownLimitValue = parseInt(limit) < 20 ? limit : 20;
     const pagnationObject: PagnationObject = {
        searchTerm: searchTerm,
        searchLimit: limit,
        storedLimit: 0, 
        shownLimit: shownLimitValue,
        offset: 0
     }
    writePagnationToSessionStorage(pagnationObject);
    onSearchSubmit(searchTerm, limit);
  };

  return (
<form
  id="searchForm"
  onSubmit={handleSearchSubmit}
  className="flex flex-col items-center space-y-4"
>
  <label className="flex flex-col items-start">
    <input
      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      type="text"
      id="searchInput"
      placeholder="Search Citations"
      value={searchTerm}
      onChange={handleInputChange}
      aria-label="Search by Zitat"
    />
  </label>
  <label className="flex flex-col items-start">
    Limit total Search Results:
    <input
      className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      type="number"
      id="limitInput"
      name="limit"
      min="1"
      max="100"
      placeholder="Limit searched entries"
      value={limit}
      onChange={handleLimitChange}
      aria-label="Limit"
    />
  </label>

  <button
    className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 py-3 px-12 rounded-md"
    type="submit"
    aria-label="Search"
  >
    Search
  </button>
</form>


  );
};

export default Search;
