import React from 'react'

const TrackHeader = (props) => {

    return (
        <div className="track-header">
            <h1>{props.author}</h1>
            <h3>{props.title}</h3>
        </div>
    )
}

export default TrackHeader;