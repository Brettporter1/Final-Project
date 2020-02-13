import React, {useEffect, useContext, useState} from 'react';
import TrackHeader from '../../components/TrackHeader';
import playContext from '../../utils/PlayContext';
import ChannelContext from '../../utils/ChannelContext'
import {useParams, Link} from 'react-router-dom';
import Axios from 'axios';
const Track = () => {
    const guid = useParams().guid.replace(/~/g, '/').replace(/\_/, '?');
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
    const [track, setTrack] = useState({});

    useEffect(() => {
       console.log(guid);
       console.log(selectedChannel);
       Axios.post('/api/rss', {
           url: selectedChannel.feedUrl
       })
       .then(res => {
           console.log(res.data);
           const thisTrack = res.data.find(track => (track.guid._text === guid || track.guid._cdata === guid) );
           console.log(thisTrack);
           setTrack({...thisTrack});
          
       })
    }, [])

    return (
        <div className="track-component">
            <TrackHeader title={(track.description ? (track.description._cdata || track.description._text) : null)} author={(track.title ? (track.title._text || track.title_cdata) : null)} />
        </div>
    )


}

export default Track;