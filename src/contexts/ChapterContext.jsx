import useSaveToLocalStorageOnChange from "@hooks/useSaveToLocalStorageOnChange";
import React from "react";

const ChapterContext = React.createContext();

export const ChapterContextProvider = ({ children }) => {

    const [search, setSearch] = React.useState(null);
    const [chapterId, setChapterId] = React.useState(localStorage.getItem('chapterId') || 1);
    const [reciterId, setReciterId] = React.useState(localStorage.getItem('reciterId') || 1);
    const [translatorId, setTranslatorId] = React.useState(localStorage.getItem('translatorId') || 1);
    const [textType, setTextType] = React.useState(localStorage.getItem('textType') || "text_uthmani");
    const [activeWord, setActiveWord] = React.useState({ verse_key: null, position: null });

    useSaveToLocalStorageOnChange("chapterId", chapterId);
    useSaveToLocalStorageOnChange("reciterId", reciterId);
    useSaveToLocalStorageOnChange("translatorId", translatorId);
    useSaveToLocalStorageOnChange("textType", textType);

    return (
        <ChapterContext.Provider value={{
            chapterId, setChapterId,
            reciterId, setReciterId,
            translatorId, setTranslatorId,
            textType, setTextType,
            activeWord, setActiveWord,
            search, setSearch
        }}>
            {children}
        </ChapterContext.Provider>
    )
};

export const useChapterContext = () => React.useContext(ChapterContext);