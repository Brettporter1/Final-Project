import React, {useEffect} from 'react';
import Axios from 'axios';
import PostCard from '../PostCard';



const Posts = (props) => {
    
   
    const postList = props.posts.map(post => (
        <PostCard username={post.user.username} message={post.message} />
    ))
    return (
        <div className="posts-component">
            {postList}
        </div>
    )
}

export default Posts;