import React from "react";

const TafsirModalContext = React.createContext();

export const TafsirModalContextProvider = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [verseKey, setVerseKey] = React.useState(null);

    return (
        <TafsirModalContext.Provider
            value={{
                isOpen, setIsOpen,
                verseKey, setVerseKey
            }}
        >
            {children}
        </TafsirModalContext.Provider>
    )
};

export const useTafsirModal = () => React.useContext(TafsirModalContext);