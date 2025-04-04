import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getChapters } from '../../Utils/api';
import ChaptersSearch from '../../Components/ChaptersSearch/ChaptersSearch';
import BrowseChapters from '../../Components/Sections/Chapters/BrowseChapters/BrowseChapters';

function Chapters() {
    const [chaptersFiltered, setChaptersFiltered] = React.useState([]);
    const [query, setQuery] = React.useState(null);
    const [chapterType, setChapterType] = React.useState(null);
    // Use Query:
    const { data: chapters, isLoading } = useQuery({
        queryKey: ["chapters"],
        queryFn: () => getChapters(),
        refetchOnWindowFocus: false
    });
    // Set Initial Filtered:
    React.useEffect(() => {
        if (!isLoading && chapters) {
            setChaptersFiltered(chapters.chapters);
        };
    }, [chapters, isLoading]);
    // Filter With Query:
    React.useEffect(() => {
        if (!chapters?.chapters) return;
        if (chapterType && query) {
            setChaptersFiltered(chapters.chapters
                .filter(chapter => chapter.revelation_place === chapterType)
                .filter(chapter => chapter.name_arabic.toLowerCase().includes(query.toLowerCase())));
        } else if (chapterType) {
            setChaptersFiltered(chapters.chapters.filter(chapter => chapter.revelation_place === chapterType));
        } else if (query) {
            setChaptersFiltered(chapters.chapters.filter(chapter => chapter.name_arabic.toLowerCase().includes(query.toLowerCase())));
        } else {
            setChaptersFiltered([...chapters.chapters]);
        }
    }, [chapterType, query, chapters?.chapters]);


    return (
        <div className='chapters-page min-h-screen'>
            {/* Chapters Search */}
            <ChaptersSearch isLoading={isLoading} setQuery={setQuery} setChapterType={setChapterType} />
            {/* Browse Chapters */}
            <BrowseChapters isLoading={isLoading} chaptersData={chaptersFiltered} />
        </div>
    )
}

export default Chapters;