import React from 'react'

const TrackHeader = (props) => {

    return (
        <div className="track-header">
            <h1>{props.title}</h1>
            <h3>{props.desc}</h3>
            <div className="progress"></div>
            <div className="details">
                <span className="duration">{props.duration}</span>
                <span className="date">{props.date}</span>
            </div>
        </div>
    )
}

export default TrackHeader;