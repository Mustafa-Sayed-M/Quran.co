import React from 'react';
import { Link } from 'react-router-dom';
import { useAudioPlayer } from '../../../Context/AudioPlayerContext';

function ChapterCard({ chapterData: { id, name_complex, name_arabic, verses_count, translated_name } }) {

    const { chapterId, isPlaying } = useAudioPlayer();

    return (
        <div className='chapter-card'>
            <Link
                to={`/chapters/${id}?chapterName=${name_arabic}`}
                className={`p-3 rounded-md border border-border-color transition-colors block space-y-4 *:flex *:items-center *:gap-2 ${((+id === +chapterId) && isPlaying) ? 'bg-card-color/50' : 'bg-card-color sm:hover:bg-border-color'}`}
            >
                {/* Head */}
                <div className='head'>
                    {/* Number */}
                    {
                        ((+id === +chapterId) && isPlaying) ? (
                            <div className='me-2 bg-border-color/50 w-7 h-7 leading-7 text-sm text-center rounded-full font-sans text-green-color'>
                                <i className={`fa-solid fa-pause fa-fw`}></i>
                            </div>
                        ) : (
                            <div className='font-sans'>{id.toString().padStart(3, '0')}</div>
                        )
                    }
                    {/* Name Arabic */}
                    <h3 className='text-lg'>{name_arabic}</h3>
                    {/* Name Complex */}
                    <h3 className='ms-auto font-sans'>{name_complex}</h3>
                </div>
                {/* Foot */}
                <div className='foot text-sm *:opacity-70'>
                    {/* Verses Count */}
                    <p>{verses_count} آيات</p>
                    {/* Translated Name */}
                    <p className='ms-auto'>{translated_name.name}</p>
                </div>
            </Link>
        </div>
    )
}

export default ChapterCard;