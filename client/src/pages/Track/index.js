import React, {useEffect, useContext, useState} from 'react';
import TrackHeader from '../../components/TrackHeader';
import Posts from '../../components/Posts';
import playContext from '../../utils/PlayContext';
import ChannelContext from '../../utils/ChannelContext'

import {useParams, Link} from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
const Track = () => {
    const guidRaw = useParams().guid;
    const guid = useParams().guid.replace(/~/g, '/').replace(/\_/, '?');
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
    const [track, setTrack] = useState({});
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
       

      
    }, [comment.commenting, votedCount])
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
        const handleVote = (comment, type ) => {
            Axios.post(
                '/api/vote', {
                 target: comment, 
                 type: type,
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
                setVotedCount(votedCount + 1);
            })
        };
    
        
    return (
        <div className="track-component">
            <TrackHeader 
                title={selectedChannel.collectionName} 
                desc={(track.title ? (track.title._text || track.title._cdata) : null)}
                duration={(track['itunes:duration'] ? track['itunes:duration']._text || track['itunes:duration']._cdata : null)}
                date={moment(track.pubDate ? track.pubDate._text || track.pubDate._cdata : null).format('MMM Do')}
            />
            <div className="add-comment">
                <button onClick={() => {setComment({...comment, commenting: true})}} className="btn outline">Add a Comment</button>
            </div>
            <Posts handleVote={handleVote} posts={track.posts ? track.posts : []}/>
            {comment.commenting ? (
                <form action="#" className="comment-form">
                    <div className="header">
                        <p><span>Commenting on: </span>{(track.title ? (track.title._text || track.title._cdata) : null)}</p>
                    </div>
                    <textarea onChange={(e) => {setComment({...comment, comment: e.target.value})}} autoFocus></textarea>
                    <div className="actions">
                        <button onClick={() => {setComment({...comment, commenting: false})}} type="reset" className="btn cancel fill-gray">Cancel</button>
                        <button onClick={(e) => makeComment(e)}type="submit" className="btn submit outline">Submit</button>
                    </div>
                </form>

            ) : null}
        </div>
    )


}

export default Track;