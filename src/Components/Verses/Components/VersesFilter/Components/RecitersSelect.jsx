import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Select from 'react-select';
import { getReciters } from '../../../../../Utils/api';
import { useAudioPlayer } from '../../../../../Context/AudioPlayerContext';

function RecitersSelect({ customStyles }) {

    const [options, setOptions] = React.useState([]);

    const { reciterId, setReciterId } = useAudioPlayer();

    const { data: recitersData, isLoading: recitersIsLoading } = useQuery({
        queryKey: [`reciters`],
        queryFn: getReciters,
        refetchOnWindowFocus: false,
    });

    React.useEffect(() => {
        if (recitersData) {
            const grouped = {};

            recitersData.recitations.forEach((reciter) => {
                const style = reciter.style || 'بدون تصنيف';
                if (!grouped[style]) {
                    grouped[style] = [];
                }
                grouped[style].push({
                    value: reciter.id,
                    label: reciter.translated_name.name
                });
            });

            const groupedOptions = Object.entries(grouped).map(([style, options]) => ({
                label: style,
                options
            }));

            setOptions(groupedOptions);
        }
    }, [recitersData]);

    return (
        <div className='select-group relative'>
            {/* Floating Icon */}
            <div className='floating-icon absolute top-1/2 -translate-y-1/2 right-3 z-10'>
                <i className='fa-solid fa-microphone fa-fw'></i>
            </div>
            {/* Select */}
            <Select
                value={
                    options
                        .flatMap(group => group.options) // Flatten the groups
                        .find(option => option.value === Number(reciterId)) || null
                }
                options={options}
                onChange={(e) => setReciterId(e.value)}
                styles={customStyles}
                placeholder={recitersIsLoading ? 'جاري التحميل...' : 'اختر قارئ'}
                isDisabled={recitersIsLoading}
                isSearchable={false}
                name="reciter"
            />
        </div>
    )
}

export default RecitersSelect;