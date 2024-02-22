// AudioTracksTable.js
import React from 'react';

const AudioTracksTable = ({ playlist, onPlay, onPause, currentTrack, isPlaying }) => {
  return (
    <div className='audio-table'>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Audio Name</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {playlist.map((track, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{track.name}</td>
              <td>
                {index === currentTrack ? (
                  isPlaying ? (
                    <button onClick={() => onPause()}>Pause</button>
                  ) : (
                    <button onClick={() => onPause()}>Play</button>
                  )
                ) : (
                  <button onClick={() => onPlay(index)}>Play</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudioTracksTable;
