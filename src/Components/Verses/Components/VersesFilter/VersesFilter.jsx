import React from 'react';
import ScriptTypeSelect from './Components/ScriptTypeSelect';
import RecitersSelect from './Components/RecitersSelect';
import TranslationsSelect from './Components/TranslationsSelect';
import ChaptersSelect from './Components/ChaptersSelect';

const customStyles = {
    control: (styles, { isFocused }) => ({
        ...styles,
        paddingRight: '30px',
        borderColor: isFocused ? '#009805' : '#009805',
        cursor: 'pointer',
        borderWidth: '2px',
        boxShadow: 'none',
        ':hover': {
            ...styles[':hover'],
            borderColor: '#009805'
        }
    }),
    option: (styles, { isSelected }) => ({
        ...styles,
        backgroundColor: isSelected ? '#009805' : '#0098051a',
        cursor: 'pointer',
        ':active': {
            ...styles[':active'],
            backgroundColor: '#009805',
            color: '#ffffff'
        },
        ':hover': {
            ...styles[':hover'],
            backgroundColor: '#009805',
            color: '#ffffff'
        },
    })
};

function VersesFilter() {
    return (
        <div className="verses-filter bg-body-bg-color pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {/* Chapters Select */}
            <ChaptersSelect customStyles={customStyles} />
            {/* ScriptTypeSelect */}
            <ScriptTypeSelect customStyles={customStyles} />
            {/* Reciters Select */}
            <RecitersSelect customStyles={customStyles} />
            {/* Translations Select */}
            <TranslationsSelect customStyles={customStyles} />
        </div>
    );
}

export default VersesFilter;