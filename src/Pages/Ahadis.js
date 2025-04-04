import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getAhadis } from '../Utils/api';
import AhadisList from '../Components/AhadisList/AhadisList';

function Ahadis() {

    const { ahadisId } = useParams();
    const [limit, setLimit] = React.useState(20);

    const { data, isLoading } = useQuery({
        queryKey: [`ahadis-${ahadisId}-${limit}`],
        queryFn: () => getAhadis(ahadisId, limit),
        refetchOnWindowFocus: false
    });

    return (
        <div className='ahadis-page min-h-screen'>
            <div className='container'>
                <div className='ahadis-display py-10'>
                    {/*  */}
                    <div className='flex items-center justify-between mb-5 gap-3 flex-wrap'>
                        {/* Form */}
                        <form onSubmit={e => e.preventDefault()}>
                            <select
                                name='limit'
                                disabled={isLoading}
                                onChange={e => setLimit(e.target.value)}
                                className='w-[140px] sm:w-[300px] p-2 rounded-md bg-card-color border border-border-color font-sans cursor-pointer'
                            >
                                <option value={20}>20 حديث</option>
                                <option value={25}>25 حديث</option>
                                <option value={35}>35 حديث</option>
                                <option value={50}>50 حديث</option>
                            </select>
                        </form>
                        {/* Name */}
                        {
                            isLoading ? (
                                <div className='h-7 w-32 rounded-md border border-border-color bg-card-color animate-pulse'></div>
                            ) : (
                                <h2 className='font-sans'>أحاديث {data.name}</h2>
                            )
                        }
                    </div>
                    {/* Ahadis List */}
                    {
                        isLoading ? (
                            <>Loading...</>
                        ) : (
                            <AhadisList ahadis={data.items} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Ahadis;