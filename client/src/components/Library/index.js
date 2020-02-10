import React from 'react'
import SearchBar from '../SearchBar'
import SwipeCards from '../SwipeCards'
import Featured from '../../testData/podcasts.json';


const Library = () => {
  return (
    <div className="library-component">
      <SearchBar />
      <SwipeCards collection={Featured} title={'Featured Podcasts'} />
      <SwipeCards collection={Featured} title={`Podcasts you're following`} />
    </div>
  )
}

export default Library;