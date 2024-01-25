# ACDH-CH Assessment Task

React 18 and Vite as well as Typescript

Necessary dependencies for the project:

1. axios
2. react
3. typescript
4. react-dom
5. react-router
6. react-router-dom

Styling with tailwindcss

## Description

Implementation for the requirements based on the MMP database application with passages (stelle) extracted from medieval manuscripts (text).

The following API is to be sonsumed with the endpoint /stelle:

https://mmp.acdh-dev.oeaw.ac.at/api-docs/#stelle-list

Sample request: https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?zitat=gentis&zitat_lookup=icontains

## Requrments

* Implement simple search
  * Input field for the search keyword to be passed as zitat parameter
* Resultlist-item must containt at least the property: display_label and list of associated keywords from the property key_word.stichwort
* List-size: restrict search-result to first 20 items (pagnation only as optional feature)
* On click on resultlist-item.title: Optain detail-view of the entry i.e.: https://mmp.acdh-dev.oeaw.ac.at/archiv/stelle/detail/3
  * Open in new window

## Optional Features

* Structure result-list as table with additional properties as additional columns e.g. year range in which the source manuscript has been created, using properties text.start_date and text.end_date
* Add name(s) of author(s) in the list-item see property text.author
* implement pagination using the parameter limit and offset
* Use tailwind for some minimal styling
* flexible length of one page (number of list items), i.e. allow user to adjust the limit parameter)

> The last item on the list above ended up not being implemented in the way that it was meant to be because for the requirements above and the optional feature suggestion concering the list-size it was somewhat confusing what the actual feature was meant to be. As a result I did not implement the feature but rather a different one that would allow do the following:

> **Allowing the user to adjust the total number of results being presented- with 20 results per page being the standard.**

### Questions

**Q1:**

Propose an algorithm for sorting search results according to their relevance with respect to the search term.

**Answer:**
There are several algorithms that can be used for the sorting of search results.
There are several popular ones like:

* Term Frequency-Inverse Document Frequency (TF-IDF)
* BM25 (Best Matching 25)
* Named Entity Recognition (NER)

**BM25 (Best Matching 25):**

#### Summary:

1. An extension of TF-IDF that takes document length into account
2. **TF-IDF**:
   1. Assigns a weight to each term in a document
   2. Weight is based on the words frequency in the document and rarity across all documents
   3. The higher the weight of a search term the more relevant it is
   4. **Term Frequency (TF):** Measures how often a term appears in a document.
   5. **Inverse Document Frequency (IDF):** Measures the importance of a term in the entire document collection.
3. **Document Length** is taken into account **(b)** by using saturation and damping factors to adjust for document length
   1. When b is 0, there is no term saturation, and the model behaves like TF-IDF
   2. When b is 1, the saturation is fully applied
4. **Usage**: Term saturation helps prevent excessively long documents from getting disproportionately to others high scores

#### Implemntaiton:

1. Tokenize and preprocess the documents
2. Remove stop words, punctuation, and perform stemming
3. For each document and query term, calculate the term frequency (TF)
4. Calculate the length of each document (**∣**D**∣**)
5. Calculate the average document length in the collection (avgdl)
6. Calculate the inverse document frequency (IDF) for each query term (IDF calculation is modified in BM25)
7. calculate the BM25 scores for each document with respect to the query

**Q2:**

Reflect on the quality of the API – Do you see any conceptual or formal weaknesses, what would you do differently?

**Answer:**

The API is well thought out and structured. It worked as intended and there where no issues from the technical perspective. With that being said, there is the issue with mixing german and english words together. As a german speaker this was not a problem, however, considering that not all users are speaking german this might become an issue. Furthermore for non technical versed, an additional document of how-to might be necessary. However for someone who already worked in the IT and with other APIs, there where no issues.
