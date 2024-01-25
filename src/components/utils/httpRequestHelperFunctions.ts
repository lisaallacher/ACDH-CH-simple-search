import axios from 'axios';
import { mmpData, mmpDetailData, PagnationObject } from '../types';
import {
    writeSearchToSessionStorage,
    readObjectFromSessionStorage,
    handlePagnationNavigation,
    writePagnationToSessionStorage
} from './pagnationStorageFunctions';
//const url = 'https://mmp.acdh-dev.oeaw.ac.at/api/stelle';

/**
 * fetches table data based on search criteria
 *
 * @param {string} searchData search term
 * @param {string} searchLimit limit for the search results
 * @returns {Promise<mmpData[]>}p romise that resolves to an array of mmpData
 */
export const SearchFetchTableData = async (searchData: string, searchLimit: string): Promise<mmpData[]> => {
    writeSearchToSessionStorage(searchData, searchLimit);
    console.log('searchlimit: ', searchLimit);
    if (parseInt(searchLimit) > 20) {
        searchLimit = '20'; //hier prüfen ob show results per page mitübergeben bekomme wenn nicht default 20
    }
    try {
        const response = await axios.get<{ results: mmpData[] }>('https://mmp.acdh-dev.oeaw.ac.at/api/stelle', {
            params: { zitat: searchData, limit: searchLimit, zitat_lookup: 'icontains', offset: '0' }
        });

        return response.data.results;
    } catch (error) {
        console.error('Error fetching table data:', error);
        return [];
    }
};

/**
 * fetches table data for navigation  based on range adjustment => increment|decrement
 *
 * @param {string} rangeAdjust range adjustment increment|decrement
 * @returns {Promise<mmpData[]>} promise that resolves to an array of mmpData
 */
export const TableNavigationFetchData = async (rangeAdjust: string): Promise<mmpData[]> => {
    const currentPagnationObj = readObjectFromSessionStorage('pageValues') as PagnationObject;

    if (currentPagnationObj) {
        const updatedPagnationObj = handlePagnationNavigation(currentPagnationObj, rangeAdjust);
        writePagnationToSessionStorage(updatedPagnationObj);
        try {
            const response = await axios.get<{ results: mmpData[] }>('https://mmp.acdh-dev.oeaw.ac.at/api/stelle', {
                params: {
                    zitat: updatedPagnationObj.searchTerm,
                    limit: updatedPagnationObj.shownLimit,
                    zitat_lookup: 'icontains',
                    offset: updatedPagnationObj.offset
                }
            });

            return response.data.results;
        } catch (error) {
            console.error('Error fetching table data:', error);
            return [];
        }
    }
    return [];
};

/**
 * fetches entry details based on ID
 *
 * @param {number} citationId citation ID.
 * @returns {Promise<mmpDetailData | null>} promise that resolves to mmpDetailData or null
 */
export const fetchEntryDetails = async (citationId: number): Promise<mmpDetailData | null> => {
    try {
        const response = await axios.get<{ results: mmpDetailData }>(`https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?id=${citationId}`);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};
