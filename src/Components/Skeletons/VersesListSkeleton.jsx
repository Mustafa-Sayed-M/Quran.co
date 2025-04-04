import React from 'react';

function VersesListSkeleton() {
    return (
        <div className='verses-list-skeleton space-y-3'>
            {
                Array.from({ length: 15 }).map((_, index) => <div className='verses-card-skeleton p-3 rounded-md bg-card-color border border-border-color' key={index}>
                    <div className='h-4 w-10 bg-border-color animate-pulse rounded-md ms-auto'></div>
                    <div className='h-4 w-64 bg-border-color animate-pulse rounded-md mb-2'></div>
                    <div className='h-4 w-32 bg-border-color animate-pulse rounded-md'></div>
                    <hr className='border-border-color animate-pulse my-5' />
                    <div className='h-4 w-64 bg-border-color animate-pulse rounded-md mb-2 ms-auto'></div>
                    <div className='h-4 w-32 bg-border-color animate-pulse rounded-md ms-auto'></div>
                </div>)
            }
        </div>
    )
}

export default VersesListSkeleton;