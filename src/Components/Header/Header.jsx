import React from 'react';
import Hero from './Components/Hero';
import TextContent from './Components/TextContent';

function Header() {
    return (
        <header
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/header-bg.webp)`,
                backgroundSize: '500px 400px',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right',
            }}
            className='max-md:py-8 md:py-10 flex items-center bg-card-color'
        >
            <div className='container'>
                <div className='content-container'>
                    {/*  */}
                    <Hero />
                    {/* Text Content */}
                    <TextContent />
                </div>
            </div>
        </header>
    )
}

export default Header;