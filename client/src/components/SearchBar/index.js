import React, {useEffect, useState} from 'react'
import {DebounceInput} from 'react-debounce-input';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
    // const term = encodeURIComponent('syntax')

    fetch(
        `/api/searchpodcasts/${encodeURIComponent(searchTerm)}`
        ).then((result) => {
            return result.json();
        })
        .then((theJson) => {
            console.log(theJson);
            setSearchResults(theJson.results);
        })
        .catch((err) => {
            console.log(err);
        })
        },
        [searchTerm]
    )

    const resultsList = searchResults.map((podcast, i) => {
        return (
            <li key={i}>{podcast.collectionName}</li>
        )
    });

  return(

    <div className="search-component">
      <form action="#">
        <DebounceInput
            minLength={0}
            debounceTimeout={300}
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}/>
      </form>

      
      <div className="results-list">
          { searchResults.length || !searchTerm.Length ? (

          <ul>
            {resultsList}
          </ul>
          ) : (
              <p>Sooorry no results</p>
          )
          }
      </div>
    </div>
  )
}

export default SearchBar;



// {podcasts.map(podcast => (
//   <View key={podcast.collectionId}>
//     <Text>{podcast.collectionName}</Text>
//   </View>
// ))}


