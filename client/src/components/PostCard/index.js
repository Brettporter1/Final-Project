import React, {useMemo, useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import UserContext from '../../utils/UserContext'
import handleVote from '../../utils/HandleVote';

const PostCard = (props) => {
    const {user, setUser} = useContext(UserContext);
    
    const countVotes = useMemo( 
        () => {
        return props.votes.reduce((total, vote) => vote.type === 'up' ? total = total + 1 : total = total - 1, 0);
        }, 
        [props.votes]
    )
    const userVoted = useMemo(
        () => {
            const userVote = props.votes.find((vote) => vote.user._id === user._id);
            if (userVote) {
                return userVote.type;
            } else {
                return null;
            }
        }, [props.votes]
    )
    return (
        <div className="post-card">
            <div className="left">
                <div className="vote">
                    <button 
                        onClick={() => {handleVote(props.id, 'up').then(() => props.refreshTrack())}} 
                        className={`up ${userVoted === 'up' ? 'active' : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" ><path d="M10 2.5L16.5 9H13v8H7V9H3.5L10 2.5z" fill="#626262"/><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
                    </button>
                        <span className="score">{countVotes}</span>
                    <button onClick={() => {handleVote(props.id, 'down').then(() => props.refreshTrack())}} className={`down ${userVoted === 'down' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" ><path d="M10 2.5L16.5 9H13v8H7V9H3.5L10 2.5z" fill="#626262"/><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
                    </button>
                </div>
            </div>
            <div className="right">
                <div className="user">
                    <h3>{props.username}</h3>
                </div>
                <ReactMarkdown className="comment-body" source={props.message}/>
                <div className="action">
                    {props.header ? (
                        <button className="reply" onClick={() => props.reply(props.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M10 9V5l-7 7l7 7v-4.1c5 0 8.5 1.6 11 5.1c-1-5-4-10-11-11z"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                        </button>
                    ) : null}
                    {!props.header ? (
                        <Link to={`/thread/${props.id}`} className="to-thread">
                            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" ><path d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                        </Link>
                    ) : null}
                </div>

            </div>
        </div>
    )
}

export default PostCard;