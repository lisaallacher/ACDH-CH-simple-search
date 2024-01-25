import React, { ReactElement } from "react";
import { readObjectFromSessionStorage } from "./utils/pagnationStorageFunctions";
import { PagnationObject } from "./types";

/**
 * Props for the Pagnation component that are strings
 * @interface
 */

interface PagnationProps {
  searchLimit: string;
  onTableNavigation: (rangeAdjust: string) => void;
}

/**
 * Pagination component for navigating through table results
 * @component
 * @param {PagnationProps} props props for the Pagnation component
 * @returns {ReactElement} - JSX Element representing the Pagination component
 */
const Pagnation: React.FC<PagnationProps> = ({ searchLimit, onTableNavigation }): ReactElement => {
 /**
   * checks if the navigation button should be disabled
   * @param {string} rangeAdjustment - adjustment range => increment|decrement
   * @returns {boolean} true if the button to be disabled, else false
   */
  const disableButton = (rangeAdjustment: string) => {
    const currentPagnationObj = readObjectFromSessionStorage('pageValues') as PagnationObject | null;

    if (currentPagnationObj !== null && typeof currentPagnationObj !== 'undefined') {
      if ((currentPagnationObj.offset as number) < 20 && rangeAdjustment === 'decrement' || parseInt(searchLimit) < 21) {
        return true;
      }
      if ((currentPagnationObj.shownLimit as number) < 20 && rangeAdjustment === 'increment' || parseInt(searchLimit) < 21) {
        return true;
      }
    } else if (currentPagnationObj === null) {
      return true;
    }
    console.log(searchLimit);
    return false;
  };

    /**
   * scrolls to the top of the page with smooth behavior
   * @returns {void}
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 /**
   * handles the forward navigation button click event
   * @returns {void}
   */
  const handleForwards = () => {
    onTableNavigation('increment');
    scrollToTop(); 
    console.log("Show next 20 Results clicked");
  };
  /**
   * handles the backward navigation button click event
   * @returns {void}
   */
  const handleBackwards = () => {
    onTableNavigation('decrement');
    scrollToTop(); 
    console.log("Previous Results clicked");
  };

  return (
    <div className="my-4 mx-4 space-x-4">
      <button
        className={`bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-4 py-2 rounded ${disableButton('decrement') ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={disableButton('decrement')}
        onClick={handleBackwards}
      >
        Previous Results
      </button>
      <button
        className={`bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-4 py-2 rounded ${disableButton('increment') ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={disableButton('increment')}
        onClick={handleForwards}
      >
        Show next 20 Results
      </button>
    </div>
  );
};

export default Pagnation;
