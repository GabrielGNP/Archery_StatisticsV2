import React, { createContext, useContext, useState } from 'react'

const MenuContext = createContext();

export const MenuProvider = ({children}) => {
    const [currentMenuHandler, setCurrentMenuHandler ] = useState(null);

    const registerMenuHandler = (handler) => {
        setCurrentMenuHandler(() => handler);
    };

    const unregisterMenuHandler = () => {
        setCurrentMenuHandler(null);
    }

    const openMenu = () => {
        if (currentMenuHandler){
            currentMenuHandler();
        } else {
            console.log('No hay handler registrado para esta pantalla');
        }   
    };

    return (
        <MenuContext.Provider value={{
            registerMenuHandler,
            unregisterMenuHandler,
            openMenu
        }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if(!context){
        throw new Error("useModal debe usarse dentro de ModalProvider");
    }
    return context;
}
