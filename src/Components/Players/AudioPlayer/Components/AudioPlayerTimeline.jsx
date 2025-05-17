import React from 'react';

function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function AudioPlayerTimeline({ currentTime, duration, onChange }) {
    return (
        <div className='audio-player-time-line flex items-center gap-3 flex-1 max-sm:w-full'>
            {/* Time Info */}
            <div className='time-info w-24 text-nowrap'>
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            {/* Input Range */}
            <input
                min={0}
                max={duration}
                value={currentTime}
                step={0.1}
                type='range'
                onChange={onChange}
                style={{
                    background: `linear-gradient(to right, #009805 ${(currentTime / duration) * 100}%, #0098051a ${(currentTime / duration) * 100}%)`
                }}
                className="
                        w-full
                        h-2 
                        bg-green-200 
                        rounded-lg 
                        appearance-none 
                        cursor-pointer 
                        accent-green-600

                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-green-600
                        [&::-webkit-slider-thumb]:hover:bg-green-700
                        [&::-webkit-slider-thumb]:shadow-md

                        [&::-moz-range-thumb]:w-4
                        [&::-moz-range-thumb]:h-4
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-green-600
                        [&::-moz-range-thumb]:hover:bg-green-700
                    "
            />
        </div>
    )
}

export default AudioPlayerTimeline;