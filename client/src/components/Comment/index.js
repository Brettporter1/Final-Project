import React from 'react';

const Comment = ({data, setComment, comment, level, index}) => {
    const levelClass = (
        level ? `level level-${level} index-${index}`: null
    )
    return (
        <div className={`comment-component ${levelClass}`}>
            <div className="left"></div>
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