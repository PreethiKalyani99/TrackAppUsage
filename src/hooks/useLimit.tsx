import React, { useState, useMemo, createContext, useContext } from "react";

interface StatusProps {
    status: string
    reason: string
}

interface LimitContextValues {
    isAlertVisible: boolean
    setIsAlertVisible: React.Dispatch<React.SetStateAction<boolean>>
    statusMessage: StatusProps
    setStatusMessage: React.Dispatch<React.SetStateAction<StatusProps>>
}


export const LimitContext = createContext<LimitContextValues>({
    isAlertVisible: false,
    setIsAlertVisible: () => {},
    statusMessage: {status: "", reason: ""},
    setStatusMessage: () => {}
})

export const LimitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)
    const [statusMessage, setStatusMessage] = useState<StatusProps>({ status: "", reason: "" })

    const value = useMemo(() => {
        return {
            isAlertVisible,
            setIsAlertVisible,
            statusMessage,
            setStatusMessage
        }
    }, [isAlertVisible, statusMessage])

    return <LimitContext.Provider value={value}>{children}</LimitContext.Provider>
}

export const useLimit = () => useContext(LimitContext)