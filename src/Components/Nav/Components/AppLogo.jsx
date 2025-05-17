import React from 'react';
import { Link } from 'react-router-dom';

function AppLogo() {
    return (
        <Link
            to={'/'}
            className='app-logo text-green-color font-bold text-2xl font-montserrat'
        >
            Quran.co
        </Link>
    )
}

export default AppLogo;