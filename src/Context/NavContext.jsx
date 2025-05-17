import React from "react";

const NavContext = React.createContext();

export const NavContextProvider = ({ children }) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <NavContext.Provider
            value={{
                isOpen, setIsOpen
            }}
        >
            {children}
        </NavContext.Provider>
    )
};

export const useNav = () => React.useContext(NavContext);