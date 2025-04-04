import React from 'react';

function Hero() {
    return (
        <picture>
            <img
                src={`${process.env.PUBLIC_URL}/assets/images/hero.webp`}
                alt='...'
                width={400}
                height={400}
                className='mx-auto'
            />
        </picture>
    )
}

export default Hero;