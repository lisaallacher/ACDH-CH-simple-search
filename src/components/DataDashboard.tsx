import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import Search from './Search';
import Pagnation from './Pagnation';
import { mmpData } from './types';
import { SearchFetchTableData, TableNavigationFetchData } from './utils/httpRequestHelperFunctions';
import Heading from './Heading';

/**
 * DataDashboard component to display search citations
 * @component
 */
const DataDashboard: React.FC = () => {
  /**
   * state to manage search term input
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * state to manage search limit input
   * @type {string}
   */
  const [limit, setLimit] = useState<string>('20');

  /**
   * state to store fetched entry data
   * @type {mmpData[]}
   */
  const [entryData, setEntryData] = useState<mmpData[]>([]);

  /**
   * fetch data based on search term and limit when component mounts or search term/limit changes
   */
  useEffect(() => {
    const fetchData = async () => {
      const data = await SearchFetchTableData(searchTerm, limit);
      setEntryData(data);
    };
    fetchData();
  }, [searchTerm, limit]);

  /**
   * handles search form submission
   * @param {string} newSearchTerm - new search term
   * @param {string} newLimit - new search limit
   */
  const handleSearchSubmit = (newSearchTerm: string, newLimit: string) => {
    setSearchTerm(newSearchTerm);
    setLimit(newLimit);
  };

  /**
   * handles table navigation => pagnation
   * @param {string} rangeAdjust - Range adjustment increment|decrement
   */
  const handleTableNavigation = async (rangeAdjust: string) => {
    const data = await TableNavigationFetchData(rangeAdjust);
    setEntryData(data);
  };

  return (
    <div>
      <Heading title="Search Citations" />
      <Search onSearchSubmit={handleSearchSubmit} />
      <TableComponent
        mmpData={entryData}
        searchLimit={limit}
      />
      <Pagnation searchLimit={limit} onTableNavigation={handleTableNavigation} />
    </div>
  );
};

export default DataDashboard;
