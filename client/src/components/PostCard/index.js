import React from 'react';
import ReactMarkdown from 'react-markdown';

const PostCard = (props) => {
    return (
        <div className="post-card">
            <div className="left">
                <div className="vote">
                    <button className="up">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" ><path d="M10 2.5L16.5 9H13v8H7V9H3.5L10 2.5z" fill="#626262"/><rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" /></svg>
                    </button>
                    <span className="score">666</span>
                    <button className="down">
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
                    <button className="to-thread">
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" ><path d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default PostCard;