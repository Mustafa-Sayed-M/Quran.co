import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSettings } from '../../../Context/SettingsContext';
import { useNav } from '../../../Context/NavContext';

function NavLinks() {

    const { lastChapterId } = useSettings();
    const { isOpen, setIsOpen } = useNav();

    const navLinksData = [
        { to: `/home/${lastChapterId}`, label: 'الرئيسية', icon: 'fa-solid fa-home fa-fw' },
        { to: `/ahadith`, label: 'أحاديث', icon: 'fa-solid fa-book-quran fa-fw' },
        { to: `/verses-saved`, label: 'المحفوظة', icon: 'fa-solid fa-bookmark fa-fw' },
    ];

    const navLinksRef = React.useRef(null);

    React.useEffect(() => {
        const handleResizeWin = () => {
            if (navLinksRef.current) {
                navLinksRef.current.classList.remove('transition');
            }
        }

        window.addEventListener('resize', handleResizeWin);
        return () => window.removeEventListener('resize', handleResizeWin);
    }, []);

    return (
        <div
            ref={navLinksRef}
            onClick={e => e.stopPropagation()}
            className={`nav-links max-md:absolute max-md:bg-white max-md:z-40 max-md:top-full max-md:w-full max-md:left-0 max-md:py-3 max-md:border-t-2 max-md:border-t-green-color transition ${isOpen ? 'max-md:opacity-100 max-md:translate-y-0' : 'max-md:opacity-0 max-md:pointer-events-none'}`}
        >
            <div className='max-md:container'>
                <ul
                    dir='rtl'
                    className='flex md:items-center max-md:flex-col'
                >
                    {
                        navLinksData.map((link, index) => (<li
                            key={index}
                        >
                            <NavLink
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => `flex items-center gap-2 p-2 transition ${isActive ? 'text-green-color' : 'sm:hover:text-green-color'}`}
                            >
                                <i className={link.icon}></i>
                                <span>{link.label}</span>
                            </NavLink>
                        </li>))
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavLinks;