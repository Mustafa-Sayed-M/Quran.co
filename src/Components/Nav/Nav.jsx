import React from 'react';
import NavLinks from './Components/NavLinks';
import AppLogo from './Components/AppLogo';
import MenuToggler from './Components/MenuToggler';

function Nav() {
    return (
        <nav className='py-3 bg-white shadow-sm sticky top-0 z-50' dir='ltr'>
            <div className='container flex items-center justify-between'>
                {/* Logo */}
                <AppLogo />
                {/* Nav Links */}
                <NavLinks />
                {/* Menu Toggler */}
                <MenuToggler />
            </div>
        </nav>
    )
}

export default Nav;