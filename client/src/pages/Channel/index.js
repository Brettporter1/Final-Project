import React, {useContext, useEffect, useState} from 'react'
import ChannelContext from '../../utils/ChannelContext'
import PlayContext from '../../utils/PlayContext'
import axios from 'axios';
import moment from 'moment';
import {useTrail, useSpring, animated} from 'react-spring';

const Channel = () => {
    const {currentTrack, setCurrentTrack} = useContext(PlayContext);
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);
    const transition = useSpring({to: {opacity: 1, transform: 'translateY(0px)'}, from: {opacity: 0, transform: 'translateY(100px)'}});
    const trail = useTrail(tracks.length, {opacity: 1, transform: 'translateY(0px)', from:{ opacity: 0, transform: 'translateY(100px)'}})
    useEffect(() => {
        setLoading(true);
        axios.post('/api/rss', {
            url: selectedChannel.feedUrl
        })
        .then(res => {
            console.log(res.data);
            setTracks(res.data);
            setLoading(false)
        })
        
    }, []);
   
    const listTracks = trail.map(({...rest}, i) =>
        <animated.div style={{...rest}} className="track-card" key={tracks[i].guid._cdata || tracks[i].guid._text} >
            <p className="date">{moment(tracks[i].pubDate._text).format('MMM Do YYYY')}</p>
            <h3>{(tracks[i].title.hasOwnProperty('_text') ? tracks[i].title._text : tracks[i].title._cdata)}</h3>
            <div className="details">
                <span className="duration">Duration: {tracks[i]['itunes:duration'] ? tracks[i]['itunes:duration']['_text'] : null}</span>
                <span className="comments">0 Comments</span>
            </div>
            <div className="controls">
                <div className="progress"></div>
                <button className="play" onClick={() => setCurrentTrack({...currentTrack, track: tracks[i].enclosure._attributes.url, author: selectedChannel.collectionName, title: (tracks[i].title.hasOwnProperty('_text') ? tracks[i].title._text : tracks[i].title._cdata) })}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" ><path d="M7 6v12l10-6z" fill="#626262"/></svg>
                </button>
            </div>
        </animated.div>
        
    )
    
    return (
        <div className="channel-container">
            <div className="title-container">
                <div className="backdrop">
                    <img src={selectedChannel.artworkUrl600}/>
                    <div className="overlay"></div>
                </div>
                <animated.h1 style={transition}>{selectedChannel.collectionName}</animated.h1>
                <animated.img style={transition} src={selectedChannel.artworkUrl600} alt={selectedChannel.collectionName}/>
            </div>
            <div className="track-list" id="track-list">
                {loading ? (
                    <div className="loader">
                        <div className="circ1"></div>
                        <div className="circ2"></div>
                        <div className="circ3"></div>
                    </div>
                  ) : listTracks
                } 
            </div>
        </div>
    )
}

export default Channel