import React from 'react';
import { useAudioPlayer } from '../../../Context/AudioPlayerContext';

function ChapterPlay({ audioFileData, isLoading }) {

    const { isPlaying, setIsPlaying, audioFile } = useAudioPlayer();

    const handleClick = () => {
        setIsPlaying((audioFileData?.audio_file?.audio_url === audioFile) ? !isPlaying : true);
    };

    return (
        <button
            type='button'
            disabled={isLoading}
            onClick={handleClick}
            aria-label='سماع السورة كاملة'
            title={
                isLoading ? 'جاري التحميل'
                    : (isPlaying && audioFileData?.audio_file?.audio_url === audioFile) ?
                        'أيقاف مؤقت' : 'سماع السورة كاملة'
            }
            className='chapter-play py-2 px-4 max-sm:flex-1 rounded-md border border-border-color bg-card-color flex items-center justify-center focus:outline-none'
        >
            <div className='me-2 bg-border-color/50 w-7 h-7 leading-7 text-sm text-center rounded-full font-sans'>
                <i className={`fa-solid fa-${isLoading ? 'spinner animate-spin' : (isPlaying && audioFileData?.audio_file?.audio_url === audioFile) ? 'pause text-green-color' : 'play'} fa-fw`}></i>
            </div>
            <span>سماع السورة</span>
        </button>
    )
}

export default ChapterPlay;