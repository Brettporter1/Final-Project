import React, {useContext, useMemo} from 'react';
import UserContext from '../../utils/UserContext';
import handleVote from '../../utils/HandleVote';
const Comment = ({data, setComment, comment, level, index, refreshThread}) => {
    const {user, setUser} = useContext(UserContext);
    
    const countVotes = useMemo( 
        () => {
        return data.votes.reduce((total, vote) => vote.type === 'up' ? total = total + 1 : total = total - 1, 0);
        }, 
        [data.votes]
    )
    const userVoted = useMemo(
        () => {
            const userVote = data.votes.find((vote) => vote.user._id === user.id);
            if (userVote) {
                return userVote.type;
            } else {
                return null;
            }
        }, [data.votes]
    )
    const levelClass = (
        level ? `level level-${level} index-${index}`: null
    )
    return (
        <div className={`comment-component ${levelClass}`}>
            <div className="left">
                <div className="vote">
                    <button 
                        onClick={() => {handleVote(data._id, 'up').then(() => refreshThread())}} 
                        className={`up ${userVoted === 'up' ? 'active' : ''}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" ><path d="M10 2.5L16.5 9H13v8H7V9H3.5L10 2.5z" fill="#626262"/><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
                    </button>
                        <span className="score">{countVotes}</span>
                    <button onClick={() => {handleVote(data._id, 'down').then(() => refreshThread())}} className={`down ${userVoted === 'down' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" ><path d="M10 2.5L16.5 9H13v8H7V9H3.5L10 2.5z" fill="#626262"/><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
                    </button>
                </div>
            </div>
            <div className="right">
                <div className="user">
                    <h3>{data.user.username}</h3>
                </div>
                <div className="message">
                    <p>{data.message}</p>
                </div>
                <div className="actions">
                    <button 
                        className="reply"
                        onClick={() => setComment({...comment, commenting: true, parent: data._id})}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M10 9V5l-7 7l7 7v-4.1c5 0 8.5 1.6 11 5.1c-1-5-4-10-11-11z"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Comment;