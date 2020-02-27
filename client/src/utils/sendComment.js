import Axios from "axios";

const makeComment = (e, channel, track, message, parent) => {
    e.preventDefault();
    if (track.guid) {
        return Axios.post(
            '/api/make-comment', {
             podcast: track, 
             channel: channel,
             message: message,
             parent: parent ? parent : null
            },
             {
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('jwt')}`
                    }, 
             }
        )
        
    }
}
export default makeComment;