import React from 'react';
import SectionHeader from '../../Components/SectionHeader';
import { Link } from 'react-router-dom';
import ChaptersGrid from '../../../Grid/ChaptersGrid';
import { getChapters } from '../../../../Utils/api';
import ChaptersGridSkeleton from '../../../Skeletons/ChaptersGridSkeleton';
import useQueryHook from '../../../../Hooks/useQueryHook';

function SomeChapters() {

    // Get Chapters Data From Cached Data or Request:
    const { data: chapters, isLoading } = useQueryHook({
        queryKey: ["chapters"],
        queryFn: getChapters
    });

    return (
        <section className='some-chapters' id='chapters'>
            <div className='container'>
                {/* Section Header */}
                <SectionHeader
                    title={'بعض السور'}
                    description={`استكشف مجموعة مختارة من سور القرآن الكريم، حيث تجد بين الآيات نورًا وهدى لحياتك اليومية. 
                        تعرّف على معانيها العميقة وتأمل في كلماتها المباركة، وابدأ رحلتك الروحية اليوم.`}
                >
                    <Link
                        to={`/chapters`}
                        title='عرض كل السور'
                        className='sm:hover:text-green-color block text-center py-2 px-4 rounded-md border border-border-color transition bg-card-color'
                    >
                        عرض كل السور
                    </Link>
                </SectionHeader>
                {/* Chapters */}
                {
                    isLoading ? (
                        <ChaptersGridSkeleton length={20} />
                    ) : (
                        <ChaptersGrid chaptersList={isLoading ? [] : chapters.chapters.slice(0, 20)} />
                    )
                }
            </div>
        </section>
    )
}

export default SomeChapters;