import { createContext } from 'react';

interface ContextProps {
    isAddingEntry: boolean;
    isDragging: boolean;
    sideMenuOpen: boolean;
    // methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    
    setIsAddingEntry: ( isAdding: boolean ) => void;
    
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps)