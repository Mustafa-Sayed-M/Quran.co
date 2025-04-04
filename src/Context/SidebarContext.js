import React from "react";

const SidebarContext = React.createContext();

export const SidebarContextProvider = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <SidebarContext.Provider
            value={{
                isOpen, setIsOpen
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
};
// Use Context

export const useSidebar = () => React.useContext(SidebarContext);