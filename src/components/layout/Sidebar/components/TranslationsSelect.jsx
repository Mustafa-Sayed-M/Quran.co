import SelectInput from "@components/common/SelectInput";
import { useSettingContext } from "@contexts/SettingContext";

function TranslationsSelect({ translatorId, setTranslatorId, isLoading, translations }) {
    const { setOpenSetting } = useSettingContext();
    return (
        <SelectInput
            id="translator"
            name="translator"
            label="المترجم"
            defaultValue={translations.find(t => Number(t.id) === Number(translatorId))}
            placeholder="اكتب اسم المترجم"
            data={translations}
            isLoading={isLoading}
            onSelect={item => {
                setTranslatorId(item.id);
                setOpenSetting(false);
            }}
        />
    );
}

export default TranslationsSelect;