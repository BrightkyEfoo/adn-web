import React, { useEffect, useRef, useState } from 'react';
import { dateFormat, ellipsis } from '../../helpers';
import { GoPlay } from 'react-icons/go';
import './event.css';
import { FaPause } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Event = ({ title, event }) => {
  const navigate = useNavigate();

  const [videoState, setVideoState] = useState({
    isPlaying: false,
    isHovered: false,
  });
  const container = useRef(null);
  const playButton = useRef(null);
  const video = useRef(null);
  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])
  const handleMouseEnter = e => {
    if (!event.image) {
      setVideoState(prev => ({ ...prev, isHovered: true }));
      playButton.current.style.visibility = 'visible';
    }
    // console.log(playButton)
  };
  const handlePlayPause = e => {
    if (videoState.isPlaying) {
      video.current.pause();
    } else {
      video.current.play();
    }
    setVideoState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };
  const handleMouseleave = e => {
    setVideoState(prev => ({ ...prev, isHovered: false }));
    playButton.current.style.visibility = 'hidden';
  };
  return event ? (
    <div
      className="event-box"
      ref={container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseleave}
    >
      <div className="event-box-video-container">
        {event.image ? (
          <img src={event.image} alt="" />
        ) : (
          <video ref={video}>
            <source src={event.video} />
          </video>
        )}
        <div className="event-box-video-play-button" ref={playButton}>
          {videoState.isPlaying ? (
            <FaPause size={30} onClick={handlePlayPause} />
          ) : (
            <GoPlay size={30} onClick={handlePlayPause} />
          )}
        </div>
      </div>
      <p className="event-box-title">{title}</p>
      {event.location.split('$br$').map((el, i) => {
        return (
          <p className="event-box-location" key={i}>
            {el}
          </p>
        );
      })}
      <p className="event-box-main">{ellipsis(120,event.main)}</p>
      <div className="event-box-footer">
        <button
          className="event-box-button"
          onClick={() => navigate('/events/' + event.id)}
        >
          MORE
        </button>
        <p className="event-box-date">{dateFormat(new Date(event.begin))}</p>
      </div>
    </div>
  ) : <div>loading</div>;
};

export default Event;
