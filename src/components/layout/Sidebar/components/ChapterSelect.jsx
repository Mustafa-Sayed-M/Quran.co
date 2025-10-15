import SelectInput from "@components/common/SelectInput";
import { useSettingContext } from "@contexts/SettingContext";
import React from "react";

function ChapterSelect({ chapterId, setChapterId, isLoading, chapters }) {
    const { setOpenSetting } = useSettingContext();
    return (
        <SelectInput
            id="chapter"
            name="chapter"
            label="السورة"
            data={chapters}
            isLoading={isLoading}
            defaultValue={chapters.find(c => Number(c.id) === Number(chapterId))}
            placeholder="اكتب اسم السورة"
            onSelect={item => {
                setChapterId(item.id);
                setOpenSetting(false);
            }}
        />
    );
};

export default ChapterSelect;