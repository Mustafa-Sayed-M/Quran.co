import React from 'react';
import { useSettings } from '../../../Context/SettingsContext';
import { useSidebar } from '../../../Context/SidebarContext';

const AudioSettings = React.memo(({ recitersData: { reciters, recitersIsLoading } }) => {

    const { setIsOpen } = useSidebar();
    const { reciter, setReciter } = useSettings();

    const handleReciterChange = (e) => {
        const id = e.target.value;
        const nameArabic = e.target.options[e.target.selectedIndex].text;
        setIsOpen(false);
        setReciter({ ...reciter, id, nameArabic })
        window.localStorage.setItem('reciterId', id);
        window.localStorage.setItem('reciterNameArabic', nameArabic);
    };

    return (
        <div className='audio-settings space-y-4'>
            {/* Label */}
            <h3 className='bg-border-color/30 p-3 rounded-md flex items-center justify-between'>
                <span>أعدادات الصوت</span>
                <i className="fa-solid fa-microphone fa-fw"></i>
            </h3>
            {/* Reciter */}
            <div className='reciter'>
                <label htmlFor='reciter'>القارئ</label>
                <select
                    id='reciter'
                    name='reciter'
                    value={reciter.id}
                    onChange={handleReciterChange}
                    disabled={recitersIsLoading}
                    className='bg-border-color p-2 rounded-md w-full cursor-pointer mt-2'
                >
                    {
                        reciters?.recitations.map((reciter, index) => <option
                            key={index}
                            value={reciter.id}
                        >
                            {reciter.translated_name.name}
                            {" "}
                            ( {
                                reciter.style === 'Mujawwad' ?
                                    'مُجود'
                                    :
                                    reciter.style === 'Murattal' ?
                                        'مُرتل'
                                        :
                                        reciter.style === 'Muallim' ?
                                            'مُعلم'
                                            :
                                            'مُجود'
                            } )
                        </option>)
                    }
                </select>
            </div>
        </div>
    )
})

export default AudioSettings;