
import React, { useEffect } from 'react';

const CommonAudioPlayer = ({ track, onEnded, onTimeUpdate, audioRef }) => {
  useEffect(() => {
    const handleLoadedMetadata = () => {
      const lastPosition = parseFloat(localStorage.getItem('lastPosition')) || 0;
      if (audioRef.current) {
        audioRef.current.currentTime = lastPosition;
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, [audioRef]);

  return (
    <div className='player'>
      <audio ref={audioRef} controls onEnded={onEnded} onTimeUpdate={onTimeUpdate}>
        <source src={track?.dataUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p>Now Playing: &nbsp;{track?.name}</p>
    </div>
  );
};

export default CommonAudioPlayer;
