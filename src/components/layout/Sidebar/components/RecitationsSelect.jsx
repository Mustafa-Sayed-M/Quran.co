import SelectInput from "@components/common/SelectInput";
import { useSettingContext } from "@contexts/SettingContext";

function RecitationsSelect({ reciterId, setReciterId, isLoading, recitations }) {
    const { setOpenSetting } = useSettingContext();
    return (
        <SelectInput
            id="reciter"
            name="reciter"
            label="القارئ"
            data={recitations}
            isLoading={isLoading}
            defaultValue={recitations.find(r => Number(r.id) === Number(reciterId))}
            placeholder="اكتب اسم القارئ"
            onSelect={item => {
                setReciterId(item.id);
                setOpenSetting(false);
            }}
        />
    );
}

export default RecitationsSelect;