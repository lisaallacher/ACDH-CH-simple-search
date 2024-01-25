import { PagnationObject } from '../types';

/**
 * writes search-related data to sessionStorage for pagination
 *
 * @param {string} searchTerm search term the user provides in the search component
 * @param {string | number} searchLimit search limit the user provides in the component
 * @returns {void}
 */
export const writeSearchToSessionStorage = (searchTerm: string, searchLimit: string | number): void => {
    const limit = typeof searchLimit === 'string' ? parseInt(searchLimit, 10) : searchLimit;
    const storedLimit = limit < 20 ? limit : 20;
    const data: PagnationObject = {
        searchTerm: searchTerm,
        searchLimit: limit,
        storedLimit: storedLimit,
        shownLimit: storedLimit,
        offset: 0
    };
    sessionStorage.setItem('pageValues', JSON.stringify(data));
};

/**
 * reads object from sessionStorage provided by the key
 *
 * @param {string} keyValue key to retrieve obj. from sessionStorage
 * @returns {object | null} stored object or null if not found
 */
export const readObjectFromSessionStorage = (keyValue: string): object | null => {
    const storedData = sessionStorage.getItem(keyValue);
    if (storedData) {
        return JSON.parse(storedData);
    }
    return null;
};

/**
 * writes pagination-related data to sessionStorage
 *
 * @param {PagnationObject} data - pagination data to be stored.
 * @returns {void}
 */
export const writePagnationToSessionStorage = (data: PagnationObject): void => {
    sessionStorage.setItem('pageValues', JSON.stringify(data));
};

/**
 * deletes obj. from sessionStorage based on a given key
 *
 * @param {string} keyValue  key to remove from sessionStorage
 * @returns {void}
 */
export const deleteObjectFromSessionStorage = (keyValue: string): void => {
    sessionStorage.removeItem(keyValue);
};

/**
 * handles pagination navigation based on data and adjustment range
 *
 * @param {PagnationObject} data pagination data
 * @param {string} rangeAdjust adjustment range => increment|decrement
 * @returns {PagnationObject} updated pagination data
 */
export const handlePagnationNavigation = (data: PagnationObject, rangeAdjust: string): PagnationObject => {
    const searchLimit: number = typeof data.searchLimit === 'number' ? data.searchLimit : parseInt(data.searchLimit, 10);
    let storedLimit: number = typeof data.storedLimit === 'number' ? data.storedLimit : parseInt(data.storedLimit, 10);
    let shownLimit: number = typeof data.shownLimit === 'number' ? data.shownLimit : parseInt(data.shownLimit, 10);
    let offset: number = typeof data.offset === 'number' ? data.offset : parseInt(data.offset, 10);

    if (rangeAdjust === 'increment') {
        if (storedLimit + 20 <= searchLimit) {
            storedLimit += 20;
            shownLimit = 20;
        } else if (storedLimit + 20 > searchLimit) {
            shownLimit = searchLimit - storedLimit;
            storedLimit = searchLimit;
        }
        if (offset < searchLimit) {
            offset += 20;
        }
    } else if (rangeAdjust === 'decrement') {
        if (storedLimit === searchLimit) {
            storedLimit = Math.floor(storedLimit / 10) * 10;
            shownLimit = 20;
            storedLimit -= 20;
        } else if (storedLimit < searchLimit) {
            shownLimit = 20;
            storedLimit -= 20;
        }
        if (offset >= 20) {
            offset -= 20;
        } else if (offset < 20) {
            storedLimit = 20;
            offset = 0;
        }
    }
    return {
        searchTerm: data.searchTerm,
        searchLimit: searchLimit,
        storedLimit: storedLimit,
        shownLimit: shownLimit,
        offset: offset
    };
};
export const removeItemOnReload = (key: string): void => {
    const handleBeforeUnload = () => {
        sessionStorage.removeItem(key);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
};

removeItemOnReload('pageValues');
