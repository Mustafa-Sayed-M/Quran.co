import React from 'react';
import { useNavbar } from '../../../Context/NavbarContext';

function NavbarToggler() {

    const { isOpen, setIsOpen } = useNavbar();

    return (
        <button
            type='button'
            title={isOpen ? 'غلق' : 'فتح'}
            onClick={e => setIsOpen(!isOpen)}
            className='py-2 px-4 rounded-md bg-card-color font-sans text-xl md:hidden'
        >
            <i className={`fa-solid fa-${isOpen ? 'xmark' : 'bars'} fa-fw`}></i>
        </button>
    )
}

export default NavbarToggler;