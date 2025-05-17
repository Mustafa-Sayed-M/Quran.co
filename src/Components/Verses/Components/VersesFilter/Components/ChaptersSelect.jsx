import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Select from 'react-select';
import { getChapters } from '../../../../../Utils/api';
import { useSettings } from '../../../../../Context/SettingsContext';
import { useNavigate } from 'react-router-dom';

function ChaptersSelect({ customStyles }) {

    const navigate = useNavigate();

    const [options, setOptions] = React.useState([]);

    const { lastChapterId } = useSettings();

    const { data: chaptersData, isLoading: chapterIsLoading } = useQuery({
        queryKey: [`chapters`],
        queryFn: getChapters,
        refetchOnWindowFocus: false,
    });

    React.useEffect(() => {
        if (chaptersData) {
            setOptions(chaptersData.chapters.map((chapter) => ({ value: chapter.id, label: chapter.name_arabic })));
        }
    }, [chaptersData]);

    return (
        <div className='select-group relative lg:hidden'>
            {/* Floating Icon */}
            <div className='floating-icon absolute top-1/2 -translate-y-1/2 right-3 z-[1]'>
                <i className='fa-solid fa-book-quran fa-fw'></i>
            </div>
            {/* Select */}
            <Select
                value={options.find(option => +option.value === +lastChapterId)}
                options={options}
                onChange={e => {
                    navigate(`/home/${e.value}`)
                }}
                styles={customStyles}
                placeholder={chapterIsLoading ? 'جاري التحميل...' : 'أختر السورة'}
                isDisabled={false}
                isSearchable={false}
                name="scriptType"
            />
        </div>
    )
}

export default ChaptersSelect;