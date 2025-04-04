import React from 'react';

function ChaptersGridSkeleton({ length }) {
    return (
        <div className='chapters-grid-skeleton grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
            {
                Array.from({ length }).map((_, index) => <div key={index} className='chapter-card-skeleton p-3 rounded-md bg-card-color border border-border-color block space-y-4'>
                    <div className='flex items-center gap-2'>
                        <div className='h-4 w-6 bg-border-color animate-pulse rounded-md'></div>
                        <div className='h-4 w-12 bg-border-color animate-pulse rounded-md'></div>
                        <div className='ms-auto h-4 w-24 bg-border-color animate-pulse rounded-md'></div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='h-4 w-6 bg-border-color animate-pulse rounded-md'></div>
                        <div className='h-4 w-9 bg-border-color animate-pulse rounded-md'></div>
                        <div className='ms-auto h-4 w-16 bg-border-color animate-pulse rounded-md'></div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default ChaptersGridSkeleton;