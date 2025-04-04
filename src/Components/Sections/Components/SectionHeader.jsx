import React from 'react';

function SectionHeader({ title, description, children }) {
    return (
        <div className='section-header flex md:items-center gap-x-10 gap-y-5 mb-10 max-md:flex-col'>
            {/* Text Content */}
            <div className='text-content flex-1 space-y-3'>
                <h2 className='text-2xl w-fit' title={title}>{title}</h2>
                <p className='text-white/65'>{description}</p>
            </div>
            {/* Children */}
            {children}
        </div>
    )
}

export default SectionHeader;