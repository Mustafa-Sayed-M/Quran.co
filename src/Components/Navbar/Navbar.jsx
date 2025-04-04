import React from 'react';
import AppLogo from '../Atoms/AppLogo';
import NavbarLinks from './Components/NavbarLinks';
import NavbarToggler from './Components/NavbarToggler';

function Navbar() {
    return (
        <nav className='navbar sticky top-0 z-[45] bg-grey-color border-b-2 border-b-border-color' dir='ltr'>
            <div className='container min-h-[60px] py-3 flex items-center justify-between'>
                {/* AppLogo */}
                <AppLogo />
                {/* Navbar Links */}
                <NavbarLinks />
                {/* Navbar Toggler */}
                <NavbarToggler />
            </div>
        </nav>
    )
}

export default Navbar;