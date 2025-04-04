import React from 'react';
import SectionHeader from '../Components/SectionHeader';
import { getAhadisList } from '../../../Utils/api';
import useQueryHook from '../../../Hooks/useQueryHook';
import AhadisGrid from './Components/AhadisGrid';

function AhadisSection() {

    const { data, isLoading } = useQueryHook({
        queryKey: ["ahadis-list"],
        queryFn: getAhadisList
    });

    return (
        <section className='ahadis py-10' id='ahadis'>
            <div className='container'>
                {/* Section Header */}
                <SectionHeader
                    title={'الأحاديث'}
                    description={`استكشف مجموعة مختارة من الأحاديث النبوية الشريفة التي تحمل في طياتها الحكمة والموعظة، وتعلم منها القيم والمبادئ التي تهدينا في حياتنا اليومية. استلهم من كلام النبي ﷺ، واتخذ من سنته نورًا يضيء دربك.`}
                />
                {/*  */}
                {
                    isLoading ? (
                        <>Loading...</>
                    ) : (
                        <AhadisGrid ahadisData={data} />
                    )
                }
            </div>
        </section>
    )
}

export default AhadisSection;