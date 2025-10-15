import { useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { LuBookCheck, LuBookmark, LuCopyCheck } from "react-icons/lu";
import VerseAction from "./components/VerseAction";
import { useTafsirContext } from "@contexts/TafsirContext";

function VerseActions({ verse = { verse_key: "1:1" } }) {

    const { openModal, setVerseKey } = useTafsirContext();
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(prev => !prev)
    };

    const actions = [
        {
            label: isSaved ? "حذف من المحفوظة" : "حفظ الأيه",
            onClick: handleSave,
            className: "save-verse-btn",
            role: "button",
            "aria-label": isSaved ? "حذف من المحفوظة" : "حفظ الأيه",
            icon: isSaved ? <IoBookmark size={18} /> : <LuBookmark size={18} />
        },
        {
            label: "نسخ الأيه",
            "aria-label": "نسخ الأيه",
            role: "button",
            className: "copy-verse-btn",
            icon: <LuCopyCheck size={18} />
        },
        {
            label: "تفسير الأيه",
            "aria-label": "تفسير الأيه",
            role: "button",
            className: "tafisr-verse-btn",
            onClick: () => {
                openModal();
                setVerseKey(verse.verse_key)
            },
            icon: <LuBookCheck size={18} />
        }
    ];

    return (
        <div className="verse-actions flex items-center justify-end gap-2">
            {
                actions.map((action, index) => (<VerseAction {...action} key={index} />))
            }
        </div>
    )
}

export default VerseActions;