import React, { useRef, useState, useEffect } from 'react';
import { useAudioPlayer } from '../../Context/AudioPlayerContext';
import { getFromLocalStorage, getFromSessionStorage, saveToLocalStorage, saveToSessionStorage } from '../../Utils/handlers';
import VolumeControl from './Components/VolumeControl';
import AudioProgress from './Components/AudioProgress';
import ReciterInfo from './Components/ReciterInfo';

function Player() {
    const audioRef = useRef(null);
    const { audioFile, isPlaying, setIsPlaying, timestamps, setVerseKey } = useAudioPlayer();

    const [currentTime, setCurrentTime] = useState(parseFloat(getFromSessionStorage('time')) || 0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(getFromLocalStorage('volume') || 0.7);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = parseFloat(getFromLocalStorage('volume')) || 0.7;
            audio.currentTime = parseFloat(getFromSessionStorage('time')) || 0;
        };
    }, []);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(error => console.error("AutoPlay Blocked:", error));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, audioFile]);

    // Update Audio Duration
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.onloadedmetadata = () => setDuration(audio.duration);
        }
    }, [audioFile]);

    // Update Time
    const handleTimeUpdate = (e) => {
        const currentTime = e.target.currentTime * 1000;
        const time = timestamps.find((time) => currentTime >= time.timestamp_from && currentTime <= time.timestamp_to);
        if (time) setVerseKey(time.verse_key);

        saveToSessionStorage('time', e.target.currentTime);
        setCurrentTime(audioRef.current.currentTime);
    };

    // Toggle Audio Play
    const togglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    // Volume Control
    const handleVolumeChange = React.useCallback((e) => {
        const newVolume = e.target.value;
        saveToLocalStorage('volume', newVolume);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    }, []);

    return (
        <div className="audio-player bg-card-color py-5 sticky bottom-0 z-40 border-t border-t-border-color">
            <div className="container">
                {/* Normal Audio Player ( Hidden ) */}
                <audio
                    ref={audioRef}
                    src={audioFile}
                    onTimeUpdate={handleTimeUpdate}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                    className='hidden'
                ></audio>

                {/* Custom Audio Player */}
                <div className='custom-audio-player flex items-center gap-5 flex-wrap'>
                    {/* ################### */}
                    <div className='flex items-center gap-3 flex-1 gap-y-5'>
                        {/* Reciter Info */}
                        <ReciterInfo />
                        {/* Previous Btn */}
                        <button
                            type='button'
                            title='السورة السابقة'
                            aria-label='السورة السابقة'
                            className='w-8 h-8 text-center leading-8 bg-border-color/70 font-sans rounded-full text-xl sm:hover:bg-border-color transition'
                        >
                            <span className='sr-only'>Previous Button</span>
                            <i className='fa-solid fa-angle-right fa-fw'></i>
                        </button>
                        {/* Play/Pause Btn */}
                        <button
                            type='button'
                            title={isPlaying ? 'إيقاف' : 'تشغيل'}
                            aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
                            onClick={togglePlay}
                            className='w-8 h-8 text-center leading-8 font-sans text-xl transition'
                        >
                            <span className='sr-only'>Play/Pause Button</span>
                            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} fa-fw`}></i>
                        </button>
                        {/* Next Btn */}
                        <button
                            type='button'
                            title='السورة التالية'
                            aria-label='السورة التالية'
                            className='w-8 h-8 text-center leading-8 bg-border-color/70 font-sans rounded-full text-xl sm:hover:bg-border-color transition'
                        >
                            <span className='sr-only'>Next Button</span>
                            <i className='fa-solid fa-angle-left fa-fw'></i>
                        </button>
                        {/* Volume Control */}
                        <VolumeControl volume={volume} handleVolumeChange={handleVolumeChange} />
                    </div>
                    {/* ################### */}
                    <AudioProgress
                        audioRef={audioRef}
                        duration={duration}
                        currentTime={currentTime}
                        setCurrentTime={setCurrentTime}
                    />
                    {/* ################### */}
                </div>
            </div>
        </div>
    );
}

export default Player;