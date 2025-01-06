import React, { useState, useMemo, createContext, useContext } from "react";

interface AppContextValue {
    selectedApp: string
    setSelectedApp:  React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext<AppContextValue>({
    selectedApp: "",
    setSelectedApp: () => {},
})

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedApp, setSelectedApp] = useState<string>("")

    const value = useMemo(() => {
        return {
            selectedApp,
            setSelectedApp
        }
    }, [selectedApp])
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)