
import React, { useState, useEffect, useRef } from 'react';
import CommonAudioPlayer from './CommonAudioPlayer';
import AudioTracksTable from './AudioTracksTable';

const AudioPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);

    const lastTrack = parseInt(localStorage.getItem('lastTrack'), 10) || 0;
    setCurrentTrack(lastTrack);
  }, []);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('lastTrack', currentTrack.toString());
  }, [playlist, currentTrack]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const audioDataUrl = event.target.result;

        setPlaylist((prevPlaylist) => [
          ...prevPlaylist,
          { name: file.name, dataUrl: audioDataUrl },
        ]);
      };

      reader.readAsDataURL(file);
    });
  };



  const handlePause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlay = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.src = playlist[index].dataUrl;
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const handleEnded = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.src = playlist[nextTrack].dataUrl;
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  };


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      localStorage.setItem('lastPosition', audioRef.current.currentTime.toString());
    }
  };

  return (
    <div className='audio-container'>
      <h1>Audio Player</h1>
      <div className='input-box'>
        <input type="file" accept=".mp3" onChange={handleFileChange} />
      </div>

      <div className='audio-player'>
        <div className='audio'>
          {playlist.length > 0 && (
            <CommonAudioPlayer
              track={playlist[currentTrack]}
              onEnded={handleEnded}
              onTimeUpdate={handleTimeUpdate}
              audioRef={audioRef}
              isPlaying={isPlaying}
            />
          )}
        </div>
      </div>

      <div className='table'>
        {playlist.length > 0 && (
          <AudioTracksTable
            playlist={playlist}
            onPlay={handlePlay}
            onPause={handlePause}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
