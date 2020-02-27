import React, {useState} from 'react';
import PostCard from '../PostCard';
const ThreadHeader = (props) => {
    return (
        <div className="thread-header">
            {props.comment ? (
                <PostCard 
                    username={props.user} 
                    votes={props.comment.votes || []}
                    id={props.comment.id}
                    message={props.comment.message}
                    refreshTrack={props.setVotedCount}
                    header={true}
                    reply={props.reply}
                />
            ) : null}
        </div>
    )
}

export default ThreadHeader;