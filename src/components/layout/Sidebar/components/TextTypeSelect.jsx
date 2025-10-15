import SelectInput from "@components/common/SelectInput";
import { useSettingContext } from "@contexts/SettingContext";

function TextTypeSelect({ textType, setTextType, isLoading = true }) {
    const { setOpenSetting } = useSettingContext();

    const textTypes = [
        { id: "text_uthmani", name: "عثماني" },
        { id: "text_imlaei_simple", name: "املائي بسيط" }
    ];

    return (
        <SelectInput
            id="textType"
            name="text-type"
            label="نوع النص"
            placeholder="اختر نوع النص"
            data={textTypes}
            isLoading={isLoading}
            defaultValue={textTypes.find(t => t.id === textType)}
            onSelect={item => {
                setTextType(item.id)
                setOpenSetting(false);
            }}
        />
    );
}

export default TextTypeSelect;