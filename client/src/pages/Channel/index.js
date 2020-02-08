import React, {useContext, useEffect, useState} from 'react'
import ChannelContext from '../../utils/ChannelContext'
import PlayContext from '../../utils/PlayContext'
import axios from 'axios';

const Channel = () => {
    const {currentTrack, setCurrentTrack} = useContext(PlayContext);
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        axios.post('/api/rss', {
            url: selectedChannel.feedUrl
        })
        .then(res => {
            console.log(res.data);
            setTracks(res.data);
        })
        
    }, []);
   
    const listTracks = tracks.map((track, i) =>
        <button key={i} onClick={() => setCurrentTrack({...currentTrack, track: track.enclosure._attributes.url})}>
            <p className="date">{track.pubDate._text}</p>
            <h3>{track.title._text}</h3>
        </button>
        
    )
    
    return (
        <div className="channel-container">
            <div className="title-container">
                <h1>{selectedChannel.collectionName}</h1>
                <img src={selectedChannel.artworkUrl600} alt={selectedChannel.collectionName}/>
            </div>
            <div className="track-list" id="track-list">
                {listTracks}
            </div>
        </div>
    )
}

export default Channel