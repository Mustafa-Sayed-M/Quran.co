import React from 'react';

const VolumeControl = React.memo(({ volume, handleVolumeChange }) => {
    return (
        <div className="volume-control flex items-center gap-2 ms-auto">
            <i className="fa-solid fa-volume-high text-lg"></i>
            <label htmlFor='volume-input'>
                <span className='sr-only'>Volume Label</span>
            </label>
            <input
                min="0"
                max="1"
                step="0.01"
                dir="ltr"
                type="range"
                value={volume}
                id='volume-input'
                name='volume-input'
                onChange={handleVolumeChange}
                className="w-24 h-2 rounded-lg appearance-none cursor-pointer border border-body-color
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-green-color 
                                [&::-webkit-slider-thumb]:rounded-full"
                style={{
                    background: `linear-gradient(to right, #1eb700 ${volume * 100}%, #535353 ${volume * 100}%)`,
                }}
            />
            <span className="text-sm font-sans">{Math.round(volume * 100)}%</span>
        </div>
    )
});

export default VolumeControl;