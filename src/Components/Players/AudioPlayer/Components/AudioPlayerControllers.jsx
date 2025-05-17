import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudioPlayer } from '../../../../Context/AudioPlayerContext';
import { useSettings } from '../../../../Context/SettingsContext';

function AudioPlayerControllers({ audioFileIsLoading }) {

    const navigate = useNavigate();

    const { isPlay, setIsPlay, audioVolume, setAudioVolume } = useAudioPlayer();

    const { lastChapterId } = useSettings();

    const handleChange = (e) => {
        setAudioVolume(e.target.value);
    };

    const btnStyles = `w-9 h-9 leading-9 text-center rounded-full text-white bg-green-color disabled:opacity-70 disabled:cursor-not-allowed font-sans`;

    return (
        <div className='audio-controllers flex items-center gap-3 max-sm:w-full'>
            {/* Audio Volume */}
            <div className='audio-volume flex items-center gap-3 max-sm:me-auto'>
                {/* Volume Info */}
                <div className='volume-text min-w-16'>
                    {/* Volume Text */}
                    <span className='w-10 text-center me-2'>{audioVolume}%</span>
                    {/* Volume Icon */}
                    <i className={`fa-solid fa-${+audioVolume === 0 ? 'volume-xmark' : +audioVolume < 30 ? 'volume-low' : 'volume-high'} fa-fw`}></i>
                </div>
                {/* Inputs Range */}
                <input
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={audioVolume}
                    type='range'
                    onChange={handleChange}
                    style={{
                        background: `linear-gradient(to right, #009805 ${audioVolume}%, #0098051a ${audioVolume}%)`
                    }}
                    className="
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

            {/* Previous Btn */}
            <button
                type='button'
                onClick={() => {
                    if (+lastChapterId !== 1) {
                        const newLastChapterId = +lastChapterId - 1;
                        navigate(`/home/${newLastChapterId}`);
                    }
                }}
                title='السورة السابقة'
                aria-label='Previous Chapter'
                disabled={audioFileIsLoading || +lastChapterId === 1 ? true : false}
                className={btnStyles}
            >
                <span className='sr-only'>Previous Chapter</span>
                <i className={`fa-solid fa-angle-left fa-fw`}></i>
            </button>
            {/* Play Btn */}
            <button
                type='button'
                aria-label='Play'
                disabled={audioFileIsLoading}
                title={isPlay ? 'أيقاف' : 'تشغيل'}
                onClick={() => setIsPlay(prev => !prev)}
                className={btnStyles}
            >
                <span className='sr-only'>Play/Pause</span>
                <i className={`fa-solid fa-${audioFileIsLoading ? 'spinner animate-spin' : isPlay ? 'pause' : 'play'} fa-fw`}></i>
            </button>
            {/* Next Btn */}
            <button
                type='button'
                onClick={() => {
                    if (+lastChapterId !== 114) {
                        const newLastChapterId = +lastChapterId + 1;
                        navigate(`/home/${newLastChapterId}`);
                    }
                }}
                title='السورة التالية'
                aria-label='Previous Chapter'
                disabled={audioFileIsLoading || +lastChapterId === 114 ? true : false}
                className={btnStyles}
            >
                <span className='sr-only'>Next Chapter</span>
                <i className={`fa-solid fa-angle-right fa-fw`}></i>
            </button>
        </div>
    )
}

export default AudioPlayerControllers;