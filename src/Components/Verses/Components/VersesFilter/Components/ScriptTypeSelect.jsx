import React from 'react';
import Select from 'react-select';
import { useSettings } from '../../../../../Context/SettingsContext';

function ScriptTypeSelect({ customStyles }) {

    const { scriptType, setScriptType } = useSettings();

    const options = [
        { value: 'text_imlaei_simple', label: 'املائي بسيط' },
        { value: 'text_indopak', label: 'اندوباك' },
        { value: 'text_uthmani', label: 'عثماني' },
    ];

    return (
        <div className='select-group relative'>
            {/* Floating Icon */}
            <div className='floating-icon absolute top-1/2 -translate-y-1/2 right-3 z-10'>
                <i className='fa-solid fa-font fa-fw'></i>
            </div>
            {/* Select */}
            <Select
                defaultValue={options.find(option => option.value === scriptType) || options[0]}
                options={options}
                onChange={(e) => setScriptType(e.value)}
                styles={customStyles}
                placeholder={''}
                isDisabled={false}
                isSearchable={false}
                name="scriptType"
            />
        </div>
    )
}

export default ScriptTypeSelect;