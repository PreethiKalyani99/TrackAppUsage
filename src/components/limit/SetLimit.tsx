import React, { useState, useEffect } from "react"
import { isLimitExceeded } from "../../utils/isLimitExceeded"
import { useData } from "../../hooks/useData"
import { useCategory } from "../../hooks/useCategory"
import { useApp } from "../../hooks/useApp"
import { useLimit } from "../../hooks/useLimit"

interface LimitProps {
    type: string
    name: string
    limit: number
    onSave: (limit: number) => void,
}

export default function SetLimit({ type, name, limit, onSave }: LimitProps) {
    const [timeLimit, setTimeLimit] = useState<number>(limit)

    const { data } = useData()
    const { selectedCategory } = useCategory()
    const { selectedApp } = useApp()
    const { setIsAlertVisible, setStatusMessage } = useLimit()

    useEffect(() => {
        const updatedLimit = !name ? 0 : limit
        setTimeLimit(updatedLimit)
    }, [limit])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        if (!isNaN(value)) {
            setTimeLimit(value)
            return
        }
    }

    const handleSave = () => {
        const categoryLimit = type === "category" ? timeLimit : data[selectedCategory]?.categoryLimit
        const appLimit = type === "app" ? timeLimit : data[selectedCategory]?.apps[selectedApp]?.limit
        const usageTime = data[selectedCategory]?.apps[selectedApp]?.usageTime

        const result = isLimitExceeded(categoryLimit, appLimit, usageTime, selectedApp, selectedCategory)
        setStatusMessage(result)
        onSave(timeLimit)
        setIsAlertVisible(true)
    }
    return (
        <div>
            <div>
                <span>Enter limit in mins</span>
                <input type="text" value={timeLimit} onChange={(e) => handleChange(e)} />
            </div>
            <button onClick={handleSave} disabled={timeLimit === limit}>Save</button>
        </div>
    )
}