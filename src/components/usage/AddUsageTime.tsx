import { useState, useEffect } from "react";
import { addTime } from "../../utils/addTime";
import { isLimitExceeded } from "../../utils/isLimitExceeded";
import { useApp } from "../../hooks/useApp";
import { useCategory } from "../../hooks/useCategory";
import { useData } from "../../hooks/useData";
import { useLimit } from "../../hooks/useLimit";

export default function AddUsageTime() {
    const { data, setData } = useData()
    const { selectedCategory } = useCategory()
    const { selectedApp } = useApp()
    const { setIsAlertVisible, setStatusMessage } = useLimit()

    const [time, setTime] = useState(data[selectedCategory]?.apps[selectedApp]?.usageTime)

    useEffect(() => {
        setTime(data[selectedCategory]?.apps[selectedApp]?.usageTime)
    }, [selectedApp])

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (!isNaN(value)) {
            setTime(value)
            return
        }
    }

    const handleSave = () => {
        const categoryLimit = data[selectedCategory]?.categoryLimit
        const appLimit = data[selectedCategory]?.apps[selectedApp]?.limit
        const isExceeded = isLimitExceeded(categoryLimit, appLimit, time)
        const totalTime = data[selectedCategory]?.apps[selectedApp]?.usageTime
        
        if(isExceeded){
            setStatusMessage({status: "error", reason: `Timer limit reached for ${selectedApp}`})
            setIsAlertVisible(true)
            return
        }
        const updatedUsageTime = addTime(time, totalTime)
        setData(prevData => {
            return {
               ...prevData,
               [selectedCategory]: {
                ...prevData[selectedCategory],
                apps: {
                    ...prevData[selectedCategory].apps,
                    [selectedApp]: {
                        ...prevData[selectedCategory].apps[selectedApp],
                        usageTime: updatedUsageTime
                    }
                }
               } 
            }
        })
        setStatusMessage({status: "success", reason: `${selectedApp} usage time does not exceed the limit`})
        setIsAlertVisible(true)
    }
    return (
        <>
            <label htmlFor="time">Enter app usage time</label>
            <input type="text" id="time" value={time || 0} onChange={handleTimeChange} />
            <button onClick={handleSave}>save</button>
        </>
    )
}