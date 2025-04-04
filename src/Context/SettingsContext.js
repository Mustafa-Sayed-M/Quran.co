import React from "react";

const SettingsContext = React.createContext();

export const SettingsContextProvider = ({ children }) => {

    const [scriptType, setScriptType] = React.useState(window.localStorage.getItem('scriptType') || 'text_uthmani');
    const [translatorId, setTranslatorId] = React.useState(window.localStorage.getItem('translatorId') || 131);
    const [reciter, setReciter] = React.useState({
        id: window.localStorage.getItem('reciterId') || 4,
        nameArabic: window.localStorage.getItem('reciterNameArabic') || 'أبو بكر الشاطرى ( مُجود )'
    });

    return (
        <SettingsContext.Provider
            value={{
                scriptType, setScriptType,
                translatorId, setTranslatorId,
                reciter, setReciter
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
};

export const useSettings = () => React.useContext(SettingsContext);