import React from "react";

const NavbarContext = React.createContext();

export const NavbarContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <NavbarContext.Provider
            value={{
                isOpen, setIsOpen
            }}
        >
            {children}
        </NavbarContext.Provider>
    )
};

export const useNavbar = () => React.useContext(NavbarContext);