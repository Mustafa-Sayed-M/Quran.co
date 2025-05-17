import React from "react";
import TafsirModal from "../Components/Modals/TafsirModal";

const TafsirModalContext = React.createContext();

export const TafsirModalContextProvider = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [tafsirSlug, setTafsirSlug] = React.useState('ar-tafsir-al-tabari');
    const [verseKey, setVerseKey] = React.useState(null);

    const openTafsirModal = () => {
        setIsOpen(true);
    };
    const closeTafsirModal = () => {
        setIsOpen(false);
    };

    return (
        <TafsirModalContext.Provider
            value={{
                isOpen,
                openTafsirModal,
                closeTafsirModal,
                tafsirSlug,
                setTafsirSlug,
                verseKey,
                setVerseKey
            }}
        >
            {/* Other Children */}
            {children}
            {/* Tafsir Modal */}
            <TafsirModal />
        </TafsirModalContext.Provider>
    )
};

export const useTafsirModal = () => React.useContext(TafsirModalContext);