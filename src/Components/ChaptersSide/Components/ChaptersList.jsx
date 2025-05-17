import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getChapters } from '../../../Utils/api';
import { NavLink } from 'react-router-dom';

function ChaptersList() {

    const { data: chaptersData, isLoading: chaptersIsLoading } = useQuery({
        queryKey: [`chapters`],
        queryFn: getChapters,
        refetchOnWindowFocus: false,
    });

    return (
        <div className='chapters-list bg-white px-2 py-3 rounded-md border-2 border-green-color'>
            {/* Chapters List Container */}
            <div className='chapters-list-container h-[calc(100vh-332px)] max-h-[1000px] overflow-y-auto shadow-sm pe-1.5 space-y-2'>
                {
                    chaptersIsLoading ? (
                        <>Loading...</>
                    ) : (
                        chaptersData.chapters.map(({ id, name_arabic, name_complex, verses_count, revelation_place }, index) => (
                            <NavLink
                                key={index}
                                to={`/home/${id}`}
                                className={({ isActive }) => `chapters-item block p-3 rounded-md space-y-2 transition-colors group ${isActive ? 'active bg-green-color text-white sticky top-0 z-10 bottom-0 border-b-white' : 'bg-green-color/10 sm:hover:bg-green-color sm:hover:text-white'}`}
                            >
                                {/* Chapter Header */}
                                <div className='chapter-header flex items-center justify-between gap-2'>
                                    {/* Name Arabic */}
                                    <h3>{name_arabic}</h3>
                                    {/* Name Complex */}
                                    <h3>{name_complex}</h3>
                                </div>
                                {/* Chapter Info */}
                                <div className='chapter-info flex items-center justify-between text-sm'>
                                    {/* Verses Count */}
                                    <div className='verses-count'>{verses_count > 10 ? `${verses_count} آيه` : `${verses_count} آيات`}</div>
                                    {/* Revelation Place */}
                                    <div className='revelation-place capitalize'>{revelation_place}</div>
                                </div>
                            </NavLink>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default ChaptersList;