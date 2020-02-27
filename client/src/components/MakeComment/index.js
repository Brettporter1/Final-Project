import React from 'react'

const MakeComment = ({setComment, comment, track, makeComment, channel, parentComment}) => {

    return(
        <form action="#" className="comment-form">
            <div className="header">
                <p><span>Commenting on: </span>{(track.title ? (track.title._text || track.title._cdata) : null)}</p>
            </div>
            <textarea onChange={(e) => {setComment({...comment, comment: e.target.value})}} autoFocus></textarea>
            <div className="actions">
                <button onClick={() => {setComment({...comment, commenting: false, parent: null})}} type="reset" className="btn cancel fill-gray">Cancel</button>
                <button 
                    onClick={(e) => makeComment(e, channel, track, comment.comment, (comment.parent || null)).then(() => setComment({comment: '', commenting: false}))} 
                    type="submit" 
                    className="btn submit outline">
                    Submit
                </button>
            </div>
        </form>

    )
    
}

export default MakeComment;