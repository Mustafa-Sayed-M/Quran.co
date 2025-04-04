import React from 'react';
import VerseCard from './Components/VerseCard';

function VersesList({ versesData }) {
    return (
        <div className='verses-list space-y-3'>
            {
                versesData.map((verse, index) => <VerseCard verseData={verse} key={index} />)
            }
        </div>
    )
}

export default VersesList;