import { useQuery } from '@tanstack/react-query';
import React from 'react';
import VersesList from './Components/VersesList/VersesList';
import VersesFilter from './Components/VersesFilter/VersesFilter';
import { useParams } from 'react-router-dom';
import { getVersesByChapter } from '../../Utils/api';
import { useSettings } from '../../Context/SettingsContext';

function Verses() {

    const { chapterId } = useParams();

    const { translatorId } = useSettings();

    const { data: versesData, isLoading: versesIsLoading } = useQuery({
        queryKey: [`chapter_verses_${chapterId}_${translatorId}`],
        queryFn: () => getVersesByChapter(chapterId, [translatorId]),
        refetchOnWindowFocus: false,
    });

    return (
        <div className='verses space-y-3 max-lg:w-full lg:w-[calc(100%-320px)] pb-5'>
            {/* Verses Filter */}
            <VersesFilter />
            {/* Verses List */}
            <VersesList
                versesList={versesData ? versesData.verses : []}
                versesIsLoading={versesIsLoading}
            />
        </div>
    )
}

export default Verses;