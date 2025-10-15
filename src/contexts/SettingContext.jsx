import React from "react";

const SettingContext = React.createContext();

export const SettingContextProvider = ({ children }) => {

    const [openSetting, setOpenSetting] = React.useState(false);

    return (
        <SettingContext.Provider value={{
            openSetting, setOpenSetting
        }}>
            {children}
        </SettingContext.Provider>
    )
};

export const useSettingContext = () => React.useContext(SettingContext);