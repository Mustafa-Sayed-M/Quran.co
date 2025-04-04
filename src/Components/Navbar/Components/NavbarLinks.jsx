import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavbar } from '../../../Context/NavbarContext';

const pagesLinks = [
    { to: '/chapters', label: 'السور', title: 'السور' },
    { to: '/', label: 'الرئيسية', title: 'الرئيسية' },
];

function NavbarLinks() {

    const navLinksRef = React.useRef(null);
    const { isOpen, setIsOpen } = useNavbar();

    React.useEffect(() => {
        const handleResize = (e) => {
            if (navLinksRef.current) {
                navLinksRef.current.classList.remove('transition');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={navLinksRef} className={`navbar-links ${isOpen ? 'max-md:translate-x-0' : 'max-md:translate-x-full'} max-md:absolute max-md:right-0 max-md:top-[70px] max-md:h-screen max-md:w-full max-md:bg-card-color max-md:py-5 transition`}>
            <div className='max-md:container'>
                <ul className='flex items-center gap-2 max-md:flex-col-reverse'>
                    {
                        pagesLinks.map((link, index) => <li key={index} className='max-md:w-full'>
                            <NavLink
                                to={link.to}
                                onClick={e => setIsOpen(false)}
                                title={'أذهب الي صفحة ' + link.title}
                                className={({ isActive }) => `${isActive ? 'text-green-color bg-card-color' : 'sm:hover:text-green-color sm:hover:bg-card-color'} block py-2 px-4 border-2 border-border-color rounded-md transition max-md:text-right`}
                            >
                                {link.label}
                            </NavLink>
                        </li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default NavbarLinks;