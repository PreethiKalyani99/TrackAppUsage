import React, { useState, useMemo, createContext, useContext } from "react";
import { Apps } from "../types/types";
import { categoriesAndApps } from "../constants/data";

interface StatusProps {
    status: string
    reason: string
}

interface DataContextValues {
    data: Apps
    setData: React.Dispatch<React.SetStateAction<Apps>>
    isAlertVisible: boolean
    setIsAlertVisible: React.Dispatch<React.SetStateAction<boolean>>
    statusMessage: StatusProps
    setStatusMessage: React.Dispatch<React.SetStateAction<StatusProps>>
}


export const DataContext = createContext<DataContextValues>({
    data: {},
    setData: () => {},
    isAlertVisible: false,
    setIsAlertVisible: () => {},
    statusMessage: {status: "", reason: ""},
    setStatusMessage: () => {}
})

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<Apps>(categoriesAndApps)
    const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false)
    const [statusMessage, setStatusMessage] = useState<StatusProps>({ status: "", reason: "" })

    const value = useMemo(() => {
        return {
            data,
            setData,
            isAlertVisible,
            setIsAlertVisible,
            statusMessage,
            setStatusMessage
        }
    }, [data, isAlertVisible, statusMessage])

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)