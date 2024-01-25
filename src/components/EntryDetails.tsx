import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mmpDetailData, DetailAutorData, DetailOrtData, DetailKeyWordData } from './types';
import { fetchEntryDetails } from './utils/httpRequestHelperFunctions';
import Heading from './Heading';


/**
 * EntryDetails component displays detailed info about an entry
 * @component
 */
const EntryDetails = () => {

  const { id } = useParams();

    /**
   * state to store details of the entry
   * @type {mmpDetailData | null}
   */
  const [entry, setEntry] = useState<mmpDetailData | null>(null);

  
  /**
   * fetches entry details based on the provided entry ID when the component mounts or ID changes
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const entryDetailsData = await fetchEntryDetails(Number(id));
        setEntry(entryDetailsData);
      } catch (error) {
        console.error('Error fetching entry details:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!entry) {
    return <h1>Loading...</h1>;
  }
  
  /**
   * renders the EntryDetails component
   * @returns {JSX.Element} - JSX Element representing EntryDetails
   */
 return (
<div className="m-8"> 
  <Heading title="Entry Details" />
  {Array.isArray(entry) && entry.map((item) => (
    <div key={item.id} className="entry-container bg-white p-6 rounded-md shadow-md mb-8"> 
      <h2 className="text-2xl font-bold mb-4">{item.text.title}</h2> 
      <h3 className="text-lg font-semibold mb-2">Display Label: {item.display_label}</h3>
      <h3 className="text-lg font-semibold mb-2">Zitat: </h3>
      <div className="mb-4 text-sm">{item.zitat}</div> 

<div className=" p-4 mb-4 rounded-md shadow-md bg-gray-200">
  <div className="mb-2 font-bold text-lg">Entry Details</div>
  
  <div className="mb-2">Entry ID: {item.id}</div>
  <div className="mb-2">Zitat Stelle: {item.zitat_stelle}</div>
  <div className="mb-2">Start Date: {item.start_date}</div>
  <div className="mb-2">End Date: {item.end_date}</div>
  <div>Kommentar: {item.kommentar}</div>
</div>


<div className="text-details mt-4 mb-8">
    <div className="mb-2 font-bold text-lg">Text Details</div>
  <div>Text Id: {item.text.id}</div>
  <div>Legacy Id: {item.text.legacy_id}</div>
  <div>Legacy Pk: {item.text.legacy_pk}</div>
  <div>Language: {item.text.text_lang}</div>
  <div>Text Start Date: {item.text.start_date}</div>
  <div>Text End Date: {item.text.end_date}</div>
  <div>Text Edition: {item.text.edition}</div>
  <div>Text Kommentar: {item.text.kommentar}</div>
</div>

<div>
  <div className='mb-2 font-bold text-lg'>Other Information</div>
        <div className="authors mt-4"> 
        <div>
          <span className='font-bold'>Authors: </span>
          {item.text.autor.map((author: DetailAutorData, index: number) => (
            <span key={author.id}>
              {author.name}
              {index < item.text.autor.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>

      <div className="locations mt-4">
        <div>
          <span className='font-bold'>Locations: </span>
          {item.text.ort.map((location: DetailOrtData, index: number) => (
            <div key={location.id}>
              <div>Name: {location.name}{index < item.text.ort.length - 1 && ', '}</div>
              <div>Longitude: {location.long}</div>
              <div>Latitude: {location.lat}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="keywords mt-4">
        <div>
          <span className='font-bold'>Keywords: </span>
          {item.key_word.map((word: DetailKeyWordData, index: number) => (
            <div key={word.id}>
              <div>{word.stichwort}{index !== item.key_word.length - 1 && ', '}</div>
              <div>Variants: {word.varianten}</div>
              <div>Wurzel: {word.wurzel}</div>
            </div>
          ))}
        </div>
      </div>
</div>
    </div>
  ))}
</div>

);

};

export default EntryDetails;
