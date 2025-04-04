import React from 'react';
import { Link } from 'react-router-dom';

function TextContent() {
    return (
        <div className='text-content max-md:order-1 text-center mt-7'>
            <h1 className='text-2xl md:text-3xl'>
                "﴿إِنَّ هَٰذَا ٱلْقُرْءَانَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ﴾"
            </h1>
            <p className='mt-5 text-lg leading-8 opacity-70'>
                نورٌ وهدى، شفاءٌ للقلوب، ودستورُ الحياة.. تدبَّر آياته، تجد السكينة والمعنى.
            </p>
            <div className='links-container flex items-center sm:justify-center gap-3 mt-4 max-sm:flex-col max-sm:*:w-full'>
                <Link
                    to={`/chapters`}
                    className='block py-2 px-4 rounded-md bg-border-color'
                >أستكشف القراء</Link>
                <Link
                    to={`/chapters`}
                    className='block py-2 px-4 rounded-md bg-green-color'
                >أستكشف السور</Link>
            </div>
        </div>
    )
}

export default TextContent;