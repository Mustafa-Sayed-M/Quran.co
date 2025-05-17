import React from 'react';
import { useTafsirModal } from '../../Context/TafsirModalContext';
import { useQuery } from '@tanstack/react-query';
import { getTafsirs, getVerseTafsir } from '../../Utils/api';
import { useSettings } from '../../Context/SettingsContext';

function TafsirModal() {

    const { isOpen, closeTafsirModal, tafsirSlug, verseKey } = useTafsirModal();
    const { scriptType } = useSettings();

    const { data: tafsirsData, isLoading: tafsirsIsIsLoading } = useQuery({
        queryKey: [`tafsirs`],
        queryFn: getTafsirs,
        refetchOnWindowFocus: false,
    });

    const { data: verseTafsirData, isLoading: verseTafsirIsIsLoading } = useQuery({
        queryKey: [`verse_tafsir_${verseKey}`],
        queryFn: () => getVerseTafsir(tafsirSlug, verseKey),
        refetchOnWindowFocus: false,
        enabled: Boolean(verseKey !== null)
    });

    return (
        <div
            onClick={closeTafsirModal}
            className={`tafsir-modal w-dvw h-dvh flex items-center fixed top-0 left-0 z-50 bg-black/35 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className='container'>
                <div
                    onClick={e => e.stopPropagation()}
                    className={`modal-content bg-zinc-800 rounded-md p-5 text-white transition ease-in ${isOpen ? 'translate-y-0' : 'translate-y-4'}`}
                >
                    {/* Header */}
                    <div className='header flex justify-between mb-7'>
                        {/* Close Btn */}
                        <button
                            type='button'
                            title='أغلاق'
                            onClick={closeTafsirModal}
                            className='w-10 h-10 leading-10 text-center text-xl border-2 border-red-500 text-red-500 rounded-full'
                        >
                            <i className='fa-solid fa-xmark fa-fw'></i>
                        </button>
                        {/* Tafsirs */}
                        <select
                            id='tafsirSlug'
                            name='tafsir_slug'
                            className='bg-transparent w-[200px] border-b border-b-white cursor-pointer transition-colors *:text-black font-medium'
                        >
                            {
                                tafsirsIsIsLoading ? (
                                    <option value={'loading'}>Loading...</option>
                                ) : (
                                    tafsirsData.tafsirs.map(({ slug, name }, index) => (
                                        <option key={index} value={slug}>{name}</option>
                                    ))
                                )
                            }
                        </select>
                    </div>
                    {/* Verse Text */}
                    <p className='text-center my-5 font-amiri text-2xl md:max-w-[750px] mx-auto leading-[3.5rem]'>{verseTafsirIsIsLoading ? 'جاري التحميل...' : verseTafsirData?.tafsir?.verses[verseKey][scriptType]}</p>
                    {/* Split Line */}
                    <hr className='opacity-30 my-3' />
                    {/* Tafsir Text */}
                    <div
                        className='tafsir-text text-center max-h-[600px] overflow-y-auto pe-1.5'
                    >
                        {
                            verseTafsirIsIsLoading ? (
                                <div className='loading-skeletons space-y-3'>
                                    <div className='h-24 bg-zinc-600 animate-pulse rounded-md'></div>
                                    <div className='h-24 bg-zinc-600 animate-pulse rounded-md'></div>
                                    <div className='h-24 bg-zinc-600 animate-pulse rounded-md'></div>
                                    <div className='h-24 bg-zinc-600 animate-pulse rounded-md'></div>
                                    <div className='h-24 bg-zinc-600 animate-pulse rounded-md'></div>
                                    <div className='h-24 bg-zinc-600 animate-pulse rounded-md'></div>
                                </div>
                            ) : (
                                <p
                                    className='text-right leading-loose'
                                    dangerouslySetInnerHTML={{
                                        __html: verseTafsirData?.tafsir?.text
                                    }}
                                ></p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TafsirModal;