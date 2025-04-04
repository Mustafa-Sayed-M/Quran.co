import React from 'react';

function HadisCard({ hadisData: { arab }, index }) {
    return (
        <div className='hadis-card p-3 rounded-md bg-card-color text-xl leading-[3rem]'>
            <div className='flex items-start gap-2'>
                <div
                    title={`حديث رقم ${index + 1}`}
                    className='font-sans bg-border-color w-8 h-8 rounded-full text-center leading-8'
                >{index + 1}</div>
                <p className='flex-1'>{arab}</p>
            </div>
        </div>
    )
}

export default HadisCard;