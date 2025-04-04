import React from 'react';
import HadisCard from './Components/HadisCard';

function AhadisList({ ahadis }) {
    return (
        <div className='ahadis-list space-y-3'>
            {
                ahadis.map((hadis, index) => <HadisCard hadisData={hadis} index={index} key={index} />)
            }
        </div>
    )
}

export default AhadisList;