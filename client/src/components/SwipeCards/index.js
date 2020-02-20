import React, {setState, useContext} from 'react';
import 'swiper/swiper.scss';
import { withRouter } from "react-router-dom";
import Swiper from 'react-id-swiper';
import {useSpring, animated} from 'react-spring';
import ChannelContext from '../../utils/ChannelContext'
const SwipeCards = (props) => {
    const {selectedChannel, setSelectedChannel} = useContext(ChannelContext);
    const transition = useSpring({to: {opacity: 1, transform: 'translateY(0px)'}, from: {opacity: 0, transform: 'translateY(100px)'}});

    function handleSelect(podcast) {
        setSelectedChannel(podcast);
        props.history.push(`/channel/${podcast.collectionId}`);

    }
    const featuredPodcasts = props.collection.map((podcast, i) => (
        <button onClick={() => handleSelect(podcast)} className="card" key={i}>
            <img src={podcast.artworkUrl600} alt={podcast.artistName}/>
            <h4>{podcast.collectionName}</h4>
        </button>
    ))
    const params = {
        slidesPerView: 2.5,
        spaceBetween: 10,
        slidesOffsetBefore: 20,
        freeMode: true,
        freeModeMomentumRatio: .7,
        mousewheel: true,
        
        breakpoints: {
            700: {
                slidesPerView: 4.5,
            }
        }
      }
    return (
        <animated.div style={transition} className="swipe-cards-container">
            <h2>{props.title}</h2>
            <Swiper {...params}>
                {featuredPodcasts}
            </Swiper>
        </animated.div>
    )
}

export default withRouter(SwipeCards);