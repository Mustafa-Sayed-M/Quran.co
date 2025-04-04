import React from 'react';
import { useSettings } from '../../../Context/SettingsContext';
import { useSidebar } from '../../../Context/SidebarContext';

const TextSettings = React.memo(({ translationsData: { translations, translationsIsLoading } }) => {

    const { setIsOpen } = useSidebar();
    const { scriptType, setScriptType, translatorId, setTranslatorId } = useSettings();

    const handleScriptTypeChange = (e) => {
        setIsOpen(false);
        setScriptType(e.target.value);
        window.localStorage.setItem('scriptType', e.target.value);
    };

    const handleTranslatorChange = (e) => {
        setIsOpen(false);
        setTranslatorId(e.target.value);
        window.localStorage.setItem('translatorId', e.target.value);
    };

    return (
        <div className='text-settings space-y-4'>
            {/* Label */}
            <h3 className='bg-border-color/30 p-3 rounded-md flex items-center justify-between'>
                <span>أعدادات النص</span>
                <i className="fa-solid fa-font fa-fw"></i>
            </h3>
            {/* Script Type */}
            <div className='script-type'>
                <label htmlFor='script-type'>نوع النص</label>
                <select
                    id='script-type'
                    name='script-type'
                    onChange={handleScriptTypeChange}
                    value={window.localStorage.getItem('scriptType') || scriptType}
                    className='bg-border-color p-2 rounded-md w-full cursor-pointer mt-2'
                >
                    <option value={'text_imlaei_simple'}>املائي بسيط</option>
                    <option value={'text_uthmani'}>عثماني</option>
                    <option value={'text_indopak'}>إندوباك</option>
                </select>
            </div>
            {/* Translator */}
            <div className='translator'>
                <label htmlFor='translator'>المترجم</label>
                <select
                    id='translator'
                    name='translator'
                    value={window.localStorage.getItem('translatorId') || translatorId}
                    disabled={translationsIsLoading}
                    onChange={handleTranslatorChange}
                    className='bg-border-color p-2 rounded-md w-full cursor-pointer mt-2 font-sans'
                >
                    {
                        translations?.translations.map((translation, index) => <option
                            key={index}
                            value={translation.id}
                        >{translation.author_name}</option>)
                    }
                </select>
            </div>
        </div>
    )
})

export default TextSettings;