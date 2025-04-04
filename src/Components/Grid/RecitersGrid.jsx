import React from 'react';
import ReciterCard from './Components/ReciterCard';

function RecitersGrid({ recitersList }) {
    return (
        <div className='reciters-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5'>
            {
                recitersList.map((reciter, index) => <ReciterCard reciterData={reciter} key={index} />)
            }
        </div>
    )
}

export default RecitersGrid;