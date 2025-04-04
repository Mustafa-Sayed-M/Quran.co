import React from 'react';
import { Link } from 'react-router-dom';

function AppLogo() {
    return (
        <Link
            to={`/`}
            title='Quran.co'
            className='font-bold text-xl block font-sans'
        >
            Quran.<span className='text-green-color'>co</span>
        </Link>
    )
}

export default AppLogo;