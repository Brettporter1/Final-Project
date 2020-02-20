import React, {useEffect} from 'react';
import Axios from 'axios';
import PostCard from '../PostCard';



const Posts = (props) => {
    
   
    const postList = props.posts.map(post => (
        <PostCard handleVote={props.handleVote} id={post._id} votes={post.votes} username={post.user.username} message={post.message} key={post._id}/>
    ))
    return (
        <div className="posts-component">
            {postList}
        </div>
    )
}

export default Posts;