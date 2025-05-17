import React from 'react';
import { useNav } from '../../../Context/NavContext';

function MenuToggler() {

    const { isOpen, setIsOpen } = useNav();

    return (
        <button
            type='button'
            onClick={() => setIsOpen(prev => !prev)}
            className='menu-toggler text-3xl md:hidden'
        >
            <i className={`fa-solid fa-${isOpen ? 'xmark text-green-color' : 'bars'} fa-fw`}></i>
        </button>
    )
}

export default MenuToggler;