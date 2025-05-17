import React from 'react';
import VersesCard from './Components/VersesCard';

function VersesList({ versesList, versesIsLoading }) {

    const [oldSavedVerses, setOldSavedVerses] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem('savedVerses')) || [];
        } catch (e) {
            console.error('Invalid JSON in localStorage', e);
            return [];
        }
    });

    return (
        <div className='verses-list flex-1 space-y-3'>
            {
                versesIsLoading ? (
                    <>Loading...</>
                ) : (
                    versesList.map((verse, index) => (<VersesCard
                        key={index}
                        verseData={verse || {}}
                        oldSavedVerses={oldSavedVerses}
                        setOldSavedVerses={setOldSavedVerses}
                    />))
                )
            }
        </div>
    )
}

export default VersesList;