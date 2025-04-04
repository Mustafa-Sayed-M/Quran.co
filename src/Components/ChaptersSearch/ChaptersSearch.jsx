import React from 'react';

const ChaptersSearch = React.memo(({ isLoading, setQuery, setChapterType }) => {
    return (
        <div className='chapters-search pt-10'>
            <div className='container'>
                <form onSubmit={e => e.preventDefault()} className='flex items-center gap-2 max-sm:flex-col'>
                    <input
                        type='text'
                        autoComplete='on'
                        placeholder='بحث'
                        disabled={isLoading}
                        name='chapters-search'
                        onChange={e => setQuery(e.target.value)}
                        className='w-full p-2 rounded-md bg-card-color border border-border-color font-sans'
                    />
                    <select
                        name='select-filter'
                        disabled={isLoading}
                        onChange={e => setChapterType(e.target.value)}
                        className='w-full sm:w-[313px] p-2 rounded-md bg-card-color border border-border-color font-sans cursor-pointer'
                    >
                        <option value={''}>تصفية</option>
                        <option value={'makkah'}>سور مكية</option>
                        <option value={'madinah'}>سور المدينة</option>
                    </select>
                </form>
            </div>
        </div>
    )
});

export default ChaptersSearch;