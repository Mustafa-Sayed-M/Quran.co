import React from 'react';
import ChapterCard from './Components/ChapterCard';

function ChaptersGrid({ chaptersList }) {
    return (
        <div className='chapters-grid grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
            {
                chaptersList.map((chapter, index) => <ChapterCard chapterData={chapter} key={index} />)
            }
        </div>
    )
}

export default ChaptersGrid;