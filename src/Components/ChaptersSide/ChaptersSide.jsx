// import { useQuery } from '@tanstack/react-query';
import React from 'react';
// import { getChapters } from '../../Utils/api';
import ChaptersSearch from './Components/ChaptersSearch';
import ChaptersList from './Components/ChaptersList';

function ChaptersSide() {

    // const { data: chaptersData, isLoading: chaptersIsLoading } = useQuery({
    //     queryKey: [`chapters`],
    //     queryFn: getChapters,
    //     refetchOnWindowFocus: false,
    // });

    return (
        <aside className='chapters-side min-w-[320px] max-lg:hidden sticky top-[148px]'>
            {/* Chapters Search */}
            <ChaptersSearch />
            {/* Chapters List */}
            <ChaptersList />
        </aside>
    )
}

export default ChaptersSide;