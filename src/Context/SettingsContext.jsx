import React from "react";

const SettingsContext = React.createContext();

export const SettingsContextProvider = ({ children }) => {

    const [lastChapterId, setLastChapterId] = React.useState(() => {
        return localStorage.getItem('lastChapterId') || 1;
    });
    const [scriptType, setScriptType] = React.useState(() => {
        return localStorage.getItem('scriptType') || 'text_indopak';
    });
    const [translatorId, setTranslatorId] = React.useState(() => {
        return localStorage.getItem('translatorId') || 131;
    });

    React.useEffect(() => {
        localStorage.setItem('lastChapterId', lastChapterId);
    }, [lastChapterId]);

    React.useEffect(() => {
        localStorage.setItem('scriptType', scriptType);
    }, [scriptType]);

    React.useEffect(() => {
        localStorage.setItem('translatorId', translatorId);
    }, [translatorId]);

    return (
        <SettingsContext.Provider
            value={{
                lastChapterId, setLastChapterId,
                scriptType, setScriptType,
                translatorId, setTranslatorId
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
};

export const useSettings = () => React.useContext(SettingsContext);