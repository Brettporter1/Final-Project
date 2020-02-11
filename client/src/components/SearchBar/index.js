import React, {useEffect, useState, useContext} from 'react'
import {DebounceInput} from 'react-debounce-input';
import {Link} from 'react-router-dom';
import {useSpring, animated} from 'react-spring';
import ChannelContext from '../../utils/ChannelContext'


const SearchBar = () => {
    const transition = useSpring({to: {opacity: 1, transform: 'translateY(0px)'}, from: {opacity: 0, transform: 'translateY(100px)'}});
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
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
        
        const link = `/channel/${podcast.collectionId}`
        return (
            <Link 
                to={link} 
                key={i} 
                className="search-listing"
                onClick={() => {setSelectedChannel(podcast)}}
            >
                <img src={podcast.artworkUrl60} alt={podcast.collectionName} className="thumb"/>
                <div className="desc">
                    <h3>
                        {podcast.collectionName}
                    </h3>
                    <p>
                        {podcast.artistName}
                    </p>
                </div>
            </Link>
        )
    });

  return(

    <div className="search-component">
      <animated.form style={transition} action="#" onSubmit={(e) => e.preventDefault()}>
        <DebounceInput
            placeholder='Search for Podcasts'
            minLength={1}
            debounceTimeout={300}
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}/>
      </animated.form>

      
      <div className="results-list">
          { !searchResults.length && searchTerm.length > 2 ? (
                <p className="sorry">Sorry, no results</p>
            ) : !searchTerm.length ? null 
            : (
                <div>
                    {resultsList}
                </div>
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


