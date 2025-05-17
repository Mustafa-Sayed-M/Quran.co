import React from 'react';
import { useAudioPlayer } from '../../../Context/AudioPlayerContext';
import { useQuery } from '@tanstack/react-query';
import { getAudioFile } from '../../../Utils/api';
import { useSettings } from '../../../Context/SettingsContext';
import AudioPlayerControllers from './Components/AudioPlayerControllers';
import AudioPlayerTimeline from './Components/AudioPlayerTimeline';

function AudioPlayer() {

    const audioRef = React.useRef(null);

    const { reciterId, isPlay, setIsPlay, audioVolume, setAudioVolume } = useAudioPlayer();
    const { lastChapterId } = useSettings();

    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(() => {
        return localStorage.getItem('currentTime') || 0
    });

    const { data: audioFileData, isLoading: audioFileIsLoading } = useQuery({
        queryKey: [`audio_file_${reciterId}_${lastChapterId}`],
        queryFn: () => getAudioFile(reciterId, lastChapterId),
        refetchOnWindowFocus: false
    });

    React.useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = audioVolume / 100;
        }
    }, [audioVolume]);

    React.useEffect(() => {
        if (audioFileData) {
            const audio = audioRef.current;
            if (audio) {
                audio.src = audioFileData.audio_file.audio_url;
            }
        }
    }, [audioFileData]);

    React.useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlay) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [audioFileData, isPlay]);

    const handleOnLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) {
            setDuration(audio.duration);
        }
    };

    const handleOnTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            const currentTime = audio.currentTime;
            setCurrentTime(currentTime);
        }
    };

    const handleChangeTimeline = (e) => {
        const newTime = parseFloat(e.target.value);
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    return (
        <div className='audio-player sticky bottom-0 z-50 bg-white shadow-sm border-t-2 border-t-green-color' dir='ltr'>
            <div className='container py-3 flex items-center gap-5 max-sm:flex-col'>
                {/* Audio Tag */}
                <audio
                    ref={audioRef}
                    onPlay={() => setIsPlay(true)}
                    onEnded={() => setIsPlay(false)}
                    className='hidden'
                    onLoadedMetadata={handleOnLoadedMetadata}
                    onTimeUpdate={handleOnTimeUpdate}
                />

                {/* Audio Player Timeline */}
                <AudioPlayerTimeline
                    currentTime={currentTime}
                    duration={duration}
                    onChange={handleChangeTimeline}
                />

                {/* Audio Controllers */}
                <AudioPlayerControllers
                    audioFileIsLoading={audioFileIsLoading}
                    audioVolume={audioVolume}
                    setAudioVolume={setAudioVolume}
                />
            </div>
        </div>
    )
}

export default AudioPlayer;