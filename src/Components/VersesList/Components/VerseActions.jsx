import React from 'react';
import { useTafsirModal } from '../../../Context/TafsirModalContext';
import { copyVerseText } from '../../../Utils/handlers';
import { useSettings } from '../../../Context/SettingsContext';

const Tooltip = ({ text }) => {
    return (
        <div className='action-tooltip max-sm:hidden absolute z-50 py-2 px-4 bg-green-color rounded-md left-1/2 -translate-x-1/2 -top-full -mt-1 text-nowrap text-sm shadow-md translate-y-2 opacity-0 scale-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100'>
            <span>{text}</span>
            <div className='border-8 border-transparent border-t-green-color absolute bottom-0 -mb-4 left-1/2 -translate-x-1/2'></div>
        </div>
    )
};
const Trigger = ({ label, icon, ...attributes }) => {
    return (
        <button
            {...attributes}
            type='button'
            aria-label={label}
            className='text-lg w-10 h-10 leading-10 text-center rounded-full bg-border-color/40 sm:hover:bg-border-color/70 transition'
        >
            <span className='sr-only'>{label}</span>
            <i className={`fa-solid fa-${icon} fa-fw`}></i>
        </button>
    )
};

function VerseActions({ verseData }) {

    const { setIsOpen, setVerseKey } = useTafsirModal();
    const { scriptType } = useSettings();

    const tafsirClick = () => {
        setVerseKey(verseData.verse_key);
        setIsOpen(true);
    };

    return (
        <div className='verse-actions flex items-center gap-2 font-sans justify-end'>
            {/* Action Container */}
            <div className='action-container relative group'>
                {/* Tooltip */}
                <Tooltip text={'تفسير الأيه'} />
                {/* Action Trigger */}
                <Trigger
                    icon={'book-open'}
                    label={'تفسير الأيه'}
                    {...{ onClick: tafsirClick }}
                />
            </div>
            {/* Action Container */}
            <div className='action-container relative group'>
                {/* Tooltip */}
                <Tooltip text={'نسخ الأيه'} />
                {/* Action Trigger */}
                <Trigger
                    icon={'copy'}
                    label={'نسخ الأيه'}
                    {...{ onClick: () => copyVerseText(verseData[scriptType]) }}
                />
            </div>
        </div>
    )
}

export default VerseActions;