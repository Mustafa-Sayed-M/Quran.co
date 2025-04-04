import React from 'react';
import { Link } from 'react-router-dom';

function AhadisGrid({ ahadisData }) {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
            {
                ahadisData.map((item, index) => <div
                    className='hadis-card'
                    key={index}
                >
                    <Link
                        to={`/ahadis/${item.slug}`}
                        className='font-sans flex items-center gap-3 justify-between p-4 bg-card-color rounded-md border border-border-color sm:hover:bg-border-color transition'
                    >
                        <p>
                            {item.total}
                            {" حديث"}
                        </p>
                        <h3>{item.name}</h3>
                    </Link>
                </div>)
            }
        </div>
    )
}

export default AhadisGrid;