import React from 'react';
import { useSidebar } from '../../../Context/SidebarContext';

function SidebarToggler({ icon, className, state }) {

    const { isOpen, setIsOpen } = useSidebar();

    return (
        <button
            type='button'
            aria-label='Sidebar Toggler'
            onClick={() => setIsOpen(state)}
            className={`lg:hidden p-3 rounded-md border border-border-color flex items-center justify-center ${isOpen ? 'bg-border-color' : 'sm:hover:bg-border-color bg-card-color'} transition ${className}`}
        >
            <span className='sr-only'>Sidebar Toggler</span>
            <i className={`${icon} fa-fw`}></i>
        </button>
    )
}

export default SidebarToggler;