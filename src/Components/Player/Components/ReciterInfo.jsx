import React from 'react';
import { useSettings } from '../../../Context/SettingsContext';

const ReciterInfo = React.memo(() => {
    const { reciter } = useSettings();
    return (
        <div className='reciter-info'>
            {/* Reciter Image */}
            <div className='w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-border-color p-1' title={reciter.nameArabic}>
                <picture>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/${reciter.id}.webp`}
                        width={40}
                        height={40}
                        className='rounded-full object-cover h-full'
                        alt='...'
                    />
                </picture>
            </div>
        </div>
    )
});

export default ReciterInfo;