import React from 'react';
import { useSettings } from '../../../Context/SettingsContext';
import { useAudioPlayer } from '../../../Context/AudioPlayerContext';
import VerseActions from './VerseActions';

function VerseCard({ verseData }) {

    const { verse_key, words, translations } = verseData;

    const verseCardRef = React.useRef(null);
    const { scriptType } = useSettings();
    const { verseKey } = useAudioPlayer();

    React.useEffect(() => {
        if (verseKey === verse_key) {
            if (verseCardRef.current) {
                verseCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [verseKey, verse_key]);

    return (
        <div
            ref={verseCardRef}
            className={`verse-card p-3 rounded-md border border-border-color transition ${verseKey === verse_key ? 'bg-card-color/50' : 'bg-card-color'}`}
        >
            {/* Verse Key */}
            <div className='verse-key font-sans opacity-80 text-lg text-left mb-4'>{verse_key}</div>
            {/* Verse Text */}
            <div className='verse-text space-y-5'>
                {/* Text Arabic */}
                <div className={`verse-text flex items-center gap-1 text-2xl flex-1 flex-wrap leading-[2.75rem] transition ${verseKey === verse_key ? 'text-green-color' : ''}`}>
                    {
                        words.slice(0, words.length - 1).map((word, index) => (
                            <p
                                key={index}
                                className='sm:hover:text-green-color cursor-pointer transition-colors'
                            >{word[scriptType]}</p>
                        ))
                    }
                </div>
                {/* Text English or Translation */}
                <p
                    dir="ltr"
                    className="font-sans"
                    dangerouslySetInnerHTML={{ __html: translations[0].text }}
                />
            </div>
            {/* Split */}
            <hr className='border-border-color my-5' />
            {/* Verse Actions */}
            <VerseActions verseData={verseData} />
        </div>
    )
}

export default VerseCard;