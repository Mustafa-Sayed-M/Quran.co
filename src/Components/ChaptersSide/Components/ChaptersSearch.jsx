import React from 'react';

function ChaptersSearch() {
    return (
        <form className='verses-search relative mb-3' onSubmit={e => e.preventDefault()}>
            <input
                type='text'
                id='versesSearch'
                name='verses_search'
                autoComplete='none'
                placeholder='أبحث عن سورة'
                className='px-2 py-4 ps-14 rounded-md w-full shadow-sm border-2 border-green-color text-green-color transition-colors peer'
            />
            <label htmlFor='versesSearch' className='absolute top-1/2 -translate-y-1/2 start-5 text-[#a1a1a1] text-xl transition-colors peer-focus:text-green-color'>
                <span className='sr-only'>Verses Search</span>
                <i className='fa-solid fa-search fa-fw'></i>
            </label>
        </form>
    )
}

export default ChaptersSearch;