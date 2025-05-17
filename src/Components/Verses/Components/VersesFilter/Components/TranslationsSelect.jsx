import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getTranslations } from '../../../../../Utils/api';
import Select from 'react-select';
import { useSettings } from '../../../../../Context/SettingsContext';

function TranslationsSelect({ customStyles }) {

    const [options, setOptions] = React.useState([]);

    const { translatorId, setTranslatorId } = useSettings();

    const { data: translationsData, isLoading: translationsIsLoading } = useQuery({
        queryKey: [`translations`],
        queryFn: getTranslations,
        refetchOnWindowFocus: false,
    });

    React.useEffect(() => {
        if (translationsData) {
            const grouped = translationsData.translations.reduce((acc, item) => {
                const language = item.language_name?.toLowerCase() || 'other';
                if (!acc[language]) {
                    acc[language] = [];
                }
                acc[language].push({
                    value: item.id,
                    label: item.name,
                });
                return acc;
            }, {});

            const groupedOptions = Object.keys(grouped).map(lang => ({
                label: lang.charAt(0).toUpperCase() + lang.slice(1), // Capitalize language name
                options: grouped[lang]
            }));

            setOptions(groupedOptions);
        }
    }, [translationsData]);

    return (
        <div className='select-group relative max-xl:col-span-2 max-lg:col-span-1'>
            {/* Floating Icon */}
            <div className='floating-icon absolute top-1/2 -translate-y-1/2 right-3 z-[1]'>
                <i className='fa-solid fa-language fa-fw'></i>
            </div>
            {/* Select */}
            <Select
                value={
                    options
                        .flatMap(group => group.options)
                        .find(option => option.value === Number(translatorId)) || options[0]?.options[0]
                }
                onChange={e => setTranslatorId(e.value)}
                options={options}
                styles={customStyles}
                placeholder={translationsIsLoading ? 'جاري التحميل...' : 'اختر المترجم'}
                isDisabled={translationsIsLoading}
                isSearchable={false}
                name="translation"
            />
        </div>
    )
}

export default TranslationsSelect;