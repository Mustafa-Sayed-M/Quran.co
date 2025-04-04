import React from 'react';
import ChaptersGrid from '../../../Grid/ChaptersGrid';
import ChaptersGridSkeleton from '../../../Skeletons/ChaptersGridSkeleton';

function BrowseChapters({ isLoading, chaptersData }) {
    return (
        <section className='browser-chapters' id='chapters'>
            <div className='container'>
                {
                    isLoading ? (
                        <ChaptersGridSkeleton length={114} />
                    ) : (
                        <ChaptersGrid chaptersList={chaptersData || []} />
                    )
                }
            </div>
        </section>
    )
}

export default BrowseChapters;