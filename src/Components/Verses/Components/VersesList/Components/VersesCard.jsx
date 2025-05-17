import React from 'react';
import { useTafsirModal } from '../../../../../Context/TafsirModalContext';
import { useSettings } from '../../../../../Context/SettingsContext';

function VersesCard({ verseData, oldSavedVerses, setOldSavedVerses }) {

    const { isOpen: tafsirModalIsOpen, openTafsirModal, setVerseKey } = useTafsirModal();
    const { scriptType } = useSettings();

    const isSaved = oldSavedVerses.find(oldVerse => +oldVerse.id === +verseData.id);

    // Destructuring Props:
    const { verse_key, translations, words } = verseData;

    // Handle Save:
    const handleSave = React.useCallback((verseData) => {
        setOldSavedVerses(prev => {
            let newVerses;
            if (isSaved) {
                newVerses = prev.filter(oldVerse => +oldVerse.id !== +verseData.id);
            } else {
                newVerses = [...prev, verseData];
            }
            newVerses.sort((a, b) => a.id - b.id);
            localStorage.setItem('savedVerses', JSON.stringify(newVerses));
            return newVerses;
        });
    }, [isSaved, setOldSavedVerses]);

    // Handle Tafisr:
    const handleTafsir = React.useCallback(() => {
        openTafsirModal();
        setVerseKey(verse_key)
    }, [openTafsirModal, setVerseKey, verse_key]);

    // Handle Copy:
    const handleCopy = React.useCallback((e) => {
        const btnTarget = e.target;
        const tooltipEle = btnTarget.querySelector('.action-tooltip');
        if (tooltipEle) {
            tooltipEle.innerText = 'تم النسخ';
        }
        navigator.clipboard.writeText(verseData.text_indopak);
    }, [verseData.text_indopak]);

    // Actions Data:
    const btnsActionsData = [
        {
            sr: 'Save Verse',
            label: isSaved ? 'الغاء حفظ الايه' : 'حفظ الايه',
            icon: `fa-${isSaved ? 'solid' : 'regular'} fa-bookmark`,
            className: isSaved ? 'opacity-100 text-green-color border-green-color' : 'border-black',
            onclick: () => handleSave(verseData)
        },
        {
            sr: 'Tafsir Verse',
            label: 'تفسير الايه',
            icon: 'fa-solid fa-book-open',
            className: tafsirModalIsOpen ? 'opacity-100 text-green-color border-green-color' : 'border-black',
            onclick: () => handleTafsir()
        },
        {
            sr: 'Copy Verse',
            label: 'نسخ الايه',
            icon: 'fa-solid fa-copy',
            className: 'border-black',
            onclick: (e) => handleCopy(e)
        },
    ];

    return (
        <div className='verses-card bg-white shadow-sm border-2 border-green-color rounded-md p-5'>
            {/* Header */}
            <div className='header flex items-center justify-between gap-5 mb-3'>
                {/* Verse Text */}
                <div className='flex items-center gap-1 font-amiri font-bold text-2xl flex-wrap leading-[3rem]'>
                    {
                        words.slice(0, words.length - 1).map((word, index) => (<p
                            key={word.id || index}
                            className='cursor-pointer transition-colors sm:hover:text-green-color'
                        >
                            {word[scriptType]}
                        </p>))
                    }
                </div>
                {/* Verse Key */}
                <div className='verse-key font-sans opacity-80 text-lg'>{verse_key}</div>
            </div>
            {/* Verse Translation Text */}
            <div
                dir='ltr'
                className='flex items-center gap-1 font-bold opacity-80 flex-wrap leading-[3rem]'
                dangerouslySetInnerHTML={{
                    __html: translations?.[0]?.text
                }}
            ></div>
            {/* Split Line */}
            <hr className='border-green-color/30' />
            {/* Verse Actions */}
            <div className='verse-actions flex items-center gap-2 mt-3' dir='ltr'>
                {
                    btnsActionsData.map(({ sr, icon, label, className, onclick }, index) => (
                        <button
                            key={index}
                            type='button'
                            onClick={onclick}
                            aria-label={sr}
                            className={`text-lg w-10 h-10 leading-10 text-center font-sans border rounded-full opacity-80 transition sm:hover:opacity-100 relative group ${className}`}
                        >
                            <span className='sr-only'>{sr}</span>
                            <i className={`${icon} fa-fw pointer-events-none`}></i>
                            {/* Action Tooltip */}
                            <div className='action-tooltip absolute -top-full -mt-3 left-1/2 -translate-x-1/2 z-50 p-2 rounded-md bg-white text-green-color shadow-md border border-green-color text-sm text-nowrap transition group-hover:scale-100 group-hover:opacity-100 opacity-0 scale-0'>
                                {label}
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default VersesCard;