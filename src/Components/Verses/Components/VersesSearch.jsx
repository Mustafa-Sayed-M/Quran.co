import React from 'react';

function VersesSearch() {
    return (
        <div className='verses-search bg-body-bg-color sticky z-40 top-[60px] md:top-[64px]'>
            <div className='container py-5'>
                <form className='relative' onSubmit={e => e.preventDefault()}>
                    <input
                        type='text'
                        id='versesSearch'
                        name='verses_search'
                        autoComplete='none'
                        placeholder='أبحث عن أيه...'
                        className='p-2 ps-14 rounded-full w-full shadow-sm border-2 border-green-color text-green-color transition-colors peer'
                    />
                    <label htmlFor='versesSearch' className='absolute top-1/2 -translate-y-1/2 start-5 text-[#a1a1a1] text-xl transition-colors peer-focus:text-green-color'>
                        <span className='sr-only'>Verses Search</span>
                        <i className='fa-solid fa-search fa-fw'></i>
                    </label>
                </form>
            </div>
        </div>
    )
}

export default VersesSearch;