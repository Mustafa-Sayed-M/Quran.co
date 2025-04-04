import React from 'react';
import { useTafsirModal } from '../../Context/TafsirModalContext';
import { useQuery } from '@tanstack/react-query';
import { getVerseTafsir } from '../../Utils/api';

function TafsirModal() {

    const { isOpen, setIsOpen, verseKey } = useTafsirModal();

    const { data: tafsirData, isLoading } = useQuery({
        queryKey: [`tafsir-${verseKey}`],
        queryFn: () => getVerseTafsir('ar-tafsir-muyassar', verseKey),
        // enabled: !!(isOpen && verseKey),
        enabled: false,
        refetchOnWindowFocus: false
    });

    if (!isOpen) return;

    return (
        <div
            data-aos='fade-up'
            data-aos-duration='200'
            onClick={() => setIsOpen(false)}
            className={`tafsir-modal w-full flex items-center justify-center h-screen fixed top-0 left-0 bg-black/60 backdrop-blur-md transition z-40`}
        >
            <div
                className='container'
            >
                <div
                    onClick={e => e.stopPropagation()}
                    className='bg-card-color p-5 rounded-md max-sm:h-[400px] sm:h-[500px] overflow-y-auto'
                >
                    {/* Close Btn */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className='w-10 h-10 leading-10 text-center font-sans text-xl bg-border-color rounded-full sm:hover:bg-border-color/50 transition'
                    >
                        <i className='fa-solid fa-xmark'></i>
                    </button>
                    {/*  */}
                    <h2>
                        {
                            isLoading ? (
                                <>loading...</>
                            ) : (
                                tafsirData?.tafisr?.resource_name
                            )
                        }
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default TafsirModal;