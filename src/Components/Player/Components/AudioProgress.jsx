import React from 'react';
import { formatTime } from '../../../Utils/handlers';

function AudioProgress({ duration, currentTime, setCurrentTime, audioRef }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <label htmlFor='progress-input'>
        <span className='sr-only'>Progress Label</span>
      </label>
      <input
        type="range"
        dir='ltr'
        min="0"
        max={duration}
        step="0.01"
        id='progress-input'
        name='progress-input'
        value={currentTime}
        onChange={(e) => {
          const newTime = parseFloat(e.target.value);
          audioRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }}
        className="w-full h-1.5 bg-border-color/50 rounded-md cursor-pointer
                appearance-none [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
              [&::-webkit-slider-thumb]:bg-green-color [&::-webkit-slider-thumb]:rounded-full"
        style={{
          background: `linear-gradient(to right, #1eb700 ${(currentTime / duration) * 100}%, #535353 ${(currentTime / duration) * 100}%)`,
        }}
      />
      {/* Time Display */}
      <div className="flex items-center gap-2 font-sans">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default AudioProgress;