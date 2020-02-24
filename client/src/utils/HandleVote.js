import Axios from 'axios';
const handleVote = (comment, type ) => {
    return Axios.post(
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
   
};

export default handleVote;