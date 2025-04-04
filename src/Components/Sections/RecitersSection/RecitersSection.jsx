import React from 'react';
import SectionHeader from '../Components/SectionHeader';
import RecitersGrid from '../../Grid/RecitersGrid';
import { getReciters } from '../../../Utils/api';
import useQueryHook from '../../../Hooks/useQueryHook';

function RecitersSection() {

    // Get Chapters Data From Cached Data or Request:
    const { data: reciters, isLoading } = useQueryHook({
        queryKey: ["reciters"],
        queryFn: getReciters
    });

    return (
        <section className='reciters-section' id='reciters'>
            <div className='container'>
                {/* Section Header */}
                <SectionHeader
                    title={'القراء'}
                    description={`استمع إلى تلاوات مميزة من نخبة قراء القرآن الكريم، حيث تمتزج الروحانية بجمال الصوت. اختر القارئ المفضل لديك، واستمتع بتلاوة هادئة وخاشعة تساعدك على التدبر والتأمل.`}
                />
                {/* Reciters Grid */}
                {
                    isLoading ? (
                        <>Loading...</>
                    ) : (
                        <RecitersGrid recitersList={reciters.recitations || []} />
                    )
                }
            </div>
        </section>
    )
}

export default RecitersSection;