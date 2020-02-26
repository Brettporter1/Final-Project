import React, {useEffect, useState, useContext} from 'react';
import ThreadHeader from '../../components/ThreadHeader';
import PostCard from '../../components/PostCard';
import {useParams} from 'react-router-dom'
import Axios from 'axios';
import MakeComment from '../../components/MakeComment';
import sendComment from '../../utils/sendComment';

import TrackContext from '../../utils/TrackContext';
import ChannelContext from '../../utils/ChannelContext';
import Comment from '../../components/Comment';
const Thread = () => {
    const [mainComment, setMainComment] = useState({});
    const {track, setTrack} = useContext(TrackContext);
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
    const [comment, setComment] = useState({
        comment: '',
        commenting: false,
        parent: null,
    });
    const [votedCount, setVotedCount] = useState(0);
    const {id} = useParams();
    useEffect(() => {
        Axios.get(`/api/thread/${id}`)
        .then(response => {
            setMainComment(response.data);
            console.log(response.data);
        });
    }, [comment.commenting, votedCount])
    const reply = (parent) => {
        setComment({...setComment, commenting: true, parent:parent})
    }
    const refreshThread = () => {
        setVotedCount(votedCount + 1);
    }
    const childComments = mainComment.children ? (
        mainComment.children.map(child => {
            return (
                <div className="div">
                    <Comment 
                        data={child}
                        comment={comment}
                        setComment={setComment}
                        refreshThread={refreshThread}
                    />
                    {
                    child ? (
                        child.children.map((subChild, i) => (
                            <Comment 
                                data={subChild}
                                comment={comment}
                                setComment={setComment}
                                level={2}
                                index={i}
                                key={i}
                                refreshThread={refreshThread}
                            />
                    ))) : null
                    }
                </div>

            )
        })
    ) : null;

    
    return (
        <div className="thread-component">
            <ThreadHeader 
                user={mainComment.user ? mainComment.user.username : null} 
                comment={mainComment}
                setVotedCount={() => setVotedCount(votedCount + 1)}
                reply={reply}
            />
            <div className="comments">
                {childComments}
            </div>
            {comment.commenting ? (
                <MakeComment
                    track={track}
                    comment={comment}
                    setComment={setComment}
                    makeComment={sendComment}
                    parentComment={mainComment._id}
                    channel={selectedChannel}
                />
            ) : null}
        </div>
    )
}

export default Thread;