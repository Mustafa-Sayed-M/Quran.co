import React from 'react';
import { useSidebar } from '../../Context/SidebarContext';
import SidebarToggler from './Components/SidebarToggler';
import TextSettings from './Components/TextSettings';
import AudioSettings from './Components/AudioSettings';
import { useQuery } from '@tanstack/react-query';
import { getReciters, getTranslations } from '../../Utils/api';

function Sidebar() {

    const ref1 = React.useRef(null);
    const ref2 = React.useRef(null);
    const { isOpen, setIsOpen } = useSidebar();

    // Get Translations:
    const { data: translations, isLoading: translationIsLoading } = useQuery({
        queryKey: ['translations'],
        queryFn: () => getTranslations(),
        refetchOnWindowFocus: false
    });

    // Get Reciters:
    const { data: reciters, isLoading: recitersIsLoading } = useQuery({
        queryKey: ['reciters'],
        queryFn: () => getReciters(),
        refetchOnWindowFocus: false
    });

    React.useEffect(() => {
        const handleResize = () => {
            if (ref1.current) {
                ref1.current.classList.remove('transition');
            }

            if (ref2.current) {
                ref2.current.classList.remove('transition');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <aside
            ref={ref1}
            onClick={() => setIsOpen(false)}
            className={`max-lg:w-screen lg:py-10 sticky h-screen lg:h-fit max-lg:fixed right-0 top-0 lg:top-[70px] lg:z-30 max-lg:bg-black/40 max-lg:backdrop-blur-sm overflow-hidden transition ${!isOpen ? 'max-lg:opacity-0 -z-50' : 'z-50'}`}
        >
            <div
                ref={ref2}
                onClick={e => e.stopPropagation()}
                className={`sidebar-content w-[300px] bg-card-color h-full lg:rounded-md p-4 lg:border lg:border-border-color transition ${!isOpen ? 'max-lg:translate-x-full' : ''}`}
            >
                {/* Header */}
                <div className='flex items-center justify-between mb-5'>
                    {/* Sidebar Toggler */}
                    <SidebarToggler icon={'fa-solid fa-xmark'} state={false} />
                    {/* Label */}
                    <h2 className='text-lg'>الأعدادات</h2>
                </div>
                {/* Text Settings */}
                <TextSettings
                    translationsData={{
                        translations,
                        translationIsLoading
                    }}
                />
                <hr className='my-10 border-border-color' />
                {/* Audio Settings */}
                <AudioSettings recitersData={{
                    reciters,
                    recitersIsLoading
                }} />
            </div>
        </aside>
    )
}

export default Sidebar;