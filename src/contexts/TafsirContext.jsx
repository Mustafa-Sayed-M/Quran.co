import useSaveToLocalStorageOnChange from "@hooks/useSaveToLocalStorageOnChange";
import React from "react";

const TafsirContext = React.createContext();

export const TafsirContextProvider = ({ children }) => {

    const [open, setOpen] = React.useState(false);
    const [verseKey, setVerseKey] = React.useState(null);
    const [interpreterSlug, setInterpreterSlug] = React.useState(localStorage.getItem('interpreterSlug') || "ar-tafsir-ibn-kathir");

    useSaveToLocalStorageOnChange("interpreterSlug", interpreterSlug);

    const openModal = React.useCallback(() => {
        setOpen(true);
    }, []);
    const closeModal = React.useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <TafsirContext.Provider value={{
            open,
            openModal,
            closeModal,
            verseKey,
            setVerseKey,
            interpreterSlug,
            setInterpreterSlug
        }}>
            {children}
        </TafsirContext.Provider>
    )
};

export const useTafsirContext = () => React.useContext(TafsirContext);