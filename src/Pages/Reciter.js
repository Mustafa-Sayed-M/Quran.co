import React from 'react';
import { useParams } from 'react-router-dom';

function Reciter() {

    const { reciterId } = useParams();

    return (
        <div className='reciter-page min-h-screen'>
            Reciter Id {reciterId}
        </div>
    )
}

export default Reciter;