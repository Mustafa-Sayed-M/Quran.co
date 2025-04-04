import React from 'react';
import { Link } from 'react-router-dom';

function ReciterCard({ reciterData: { id, translated_name, style } }) {
    return (
        <div className='reciter-card text-center'>
            <Link
                to={`/reciter/${id}`}
                className='block w-40 h-40 bg-card-color border border-border-color rounded-full mb-4 mx-auto overflow-hidden'
            >
                {/* Reciter Image */}
                <picture>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/images/${id}.webp`}
                        alt='...'
                        width={150}
                        height={150}
                        className='w-full h-full object-cover sm:hover:scale-110 ease-out duration-300 transition'
                    />
                </picture>
            </Link>
            {/* Reciter Name */}
            <h3 className='line-clamp-1'>
                {translated_name.name}
                {" "}
                ( {
                    style === 'Mujawwad' ?
                        'مُجود'
                        :
                        style === 'Murattal' ?
                            'مُرتل'
                            :
                            style === 'Muallim' ?
                                'مُعلم'
                                :
                                'مُجود'
                } )
            </h3>
        </div>
    )
}

export default ReciterCard;