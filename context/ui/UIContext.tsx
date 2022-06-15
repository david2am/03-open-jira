import { createContext } from 'react';

interface ContextProps {
    isAddingEntry: boolean;
    sideMenuOpen: boolean;
    // methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: ( isAdding: boolean ) => void;
}

export const UIContext = createContext({} as ContextProps)