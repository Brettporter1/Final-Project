import React, {useEffect, useContext, useState} from 'react';
import TrackHeader from '../../components/TrackHeader';
import Posts from '../../components/Posts';
import playContext from '../../utils/PlayContext';
import ChannelContext from '../../utils/ChannelContext';
import TrackContext from '../../utils/TrackContext';
import MakeComment from '../../components/MakeComment';
import {useParams, Link} from 'react-router-dom';
import sendComment from '../../utils/sendComment';
import Axios from 'axios';
import moment from 'moment';
const Track = () => {
    const guidRaw = useParams().guid;
    const guid = useParams().guid.replace(/~/g, '/').replace(/\_/, '?');
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
    const {track, setTrack} = useContext(TrackContext);
    const [comment, setComment] = useState({
        comment: '',
        commenting: false,
    });

    const [votedCount, setVotedCount] = useState(0);

    useEffect(() => {
        
       console.log('starting track...');
       console.log(track);
       if(guidRaw) {
        console.log('getting track data...')
        console.log(guidRaw);
        Axios.get(`/api/posts/${guidRaw}`)
        .then(res => {
            console.log('res.data.data.title');
            // console.log(res.data.data.title);
            if (res.data) {
                setTrack({...res.data.data, posts: res.data.comments});
            } else {
                Axios.post('/api/rss', {
                    url: selectedChannel.feedUrl
                })
                .then(res => {
                    console.log(res.data);
                    const thisTrack = res.data.find(track => (track.guid._text === guid || track.guid._cdata === guid) );
                    console.log('thisTrack');
                    console.log(thisTrack);
                    setTrack({...thisTrack});
                });
            }
        });
        
        }
       

      
    }, [comment.commenting, votedCount]);

    const makeComment = (e) => {
        e.preventDefault();
        if (track.guid) {
            Axios.post(
                '/api/make-comment', {
                    podcast: track, 
                    channel: selectedChannel,
                    message: comment.comment,
                },
                    {
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('jwt')}`
                        }, 
                    }
            )
            .then(res => {
                console.log(res.data);
                setComment({comment: '', commenting: false});
            })
        }
    };
        
        
    return (
        <div className="track-component">
            {track.title ? (
                <TrackHeader 
                    title={selectedChannel.collectionName} 
                    desc={(track.title ? (track.title._text || track.title._cdata) : null)}
                    duration={(track['itunes:duration'] ? track['itunes:duration']._text || track['itunes:duration']._cdata : null)}
                    date={moment(track.pubDate ? track.pubDate._text || track.pubDate._cdata : null).format('MMM Do')}
                />

            ) : null}
            <div className="add-comment">
                <button onClick={() => {setComment({...comment, commenting: true})}} className="btn outline">Add a Comment</button>
            </div>
            <Posts posts={track.posts ? track.posts : []} refreshTrack={() => setVotedCount(votedCount + 1)}/>
            {comment.commenting ? (
                <MakeComment 
                    track={track}
                    makeComment={sendComment}
                    comment={comment}
                    setComment={setComment}
                    channel={selectedChannel}
                />
            ) : null}
        </div>
    )


}

export default Track;