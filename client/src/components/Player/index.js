import React, {useEffect, useContext, useState} from 'react';
import {Howl, Howler} from 'howler';
import {useSpring, animated} from 'react-spring'
import PlayContext from '../../utils/PlayContext';


let track;
const Player = () => {
   
    const transition = useSpring({to: {opacity: 1, transform: 'translateY(0px)'}, from: {opacity: 0, transform: 'translateY(100px)'}});

    const {currentTrack, setCurrentTrack} = useContext(PlayContext);
    const [loading, setLoading] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        if (currentTrack.track) {
            if(track) {
                track.unload();
            }
            track = new Howl({
                src: [currentTrack.track],
                preload: true,
                html5: true,
                
            });
            track.on('load', handleLoad)
            // track.load();
            track.play();
                
            setCurrentTrack({...currentTrack, playing: true})
        }
    
    }, [currentTrack.track]);

    useEffect(() => {
        let progressInterval;
        if (currentTrack.playing === true && track) {
            progressInterval = setInterval(() => {
                const progress = (track.seek() / track.duration() ) * 100;
                console.log(track.seek());
                setProgress(progress)
            }, 500);
            track.play();
        } else if (track) {
            clearInterval(progressInterval);
            track.pause();

        }
    
    }, [currentTrack.playing]);

    const handleLoad = () => {
        const node = track._sounds[0]._node;
        // const node:HTMLAudioElement = (audio as any)._sounds[0]._node; // For Typescript
        node.addEventListener('progress', () => {
          const duration = track.duration();
      
          // https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges#Creating_our_own_Buffering_Feedback
          if (duration > 0) {
            for (let i = 0; i < node.buffered.length; i++) {
              if (node.buffered.start(node.buffered.length - 1 - i) < node.currentTime) {
                const bufferProgress = (node.buffered.end(node.buffered.length - 1 - i) / duration) * 100;
                // do what you will with it. I.E - store.set({ bufferProgress });
                console.log(bufferProgress);
                setLoading(bufferProgress);
                break;
              }
            }
          }
        });
    }   
    const seek = (e) => {
        const percent = (e.clientX / window.innerWidth);
        console.log(window.innerWidth);
        console.log(e.clientX);
        console.log(percent);
        if (track) {
            track.seek(track.duration() * percent);
        }
        // console.log(percent);
    }
   
    return(
        <animated.div style={transition} className="player-component">
            <div className="progress-bar" onClick={(e) => seek(e)}>
                <div style={{width: `${ progress }%`}} className="progress-inner"></div>
                <div className="loading-inner" style={{width: `${loading}%`}}></div>
            </div>
            <div className="controls">
                <div className="inner">
                <button className="previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" ><path d="M16 7l-7 5l7 5zm-7 5V7H7v10h2z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                </button>
                {!currentTrack.playing ? (

                    <button className="play" onClick={() => setCurrentTrack({...currentTrack, playing: true})}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" ><path d="M7 6v12l10-6z" fill="#626262"/></svg>
                    </button>

                ) : (

                    <button className="pause" onClick={() => setCurrentTrack({...currentTrack, playing: false})}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#626262"/></svg>      
                    </button>

                )}
                <button className="next">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" ><path d="M7 7v10l7-5zm9 10V7h-2v10z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
                </button>
                </div>
            </div>

        </animated.div>
    )
}

export default Player;