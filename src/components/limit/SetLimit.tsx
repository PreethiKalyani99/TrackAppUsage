import React, { useState, useEffect } from "react"
import styles from "./SetLimit.module.css"

interface LimitProps {
    type: string
    name: string
    limit: number
    onSave: (limit: number) => void,
}

export default function SetLimit({ name, limit, onSave }: LimitProps) {
    const [timeLimit, setTimeLimit] = useState<number>(limit)

    useEffect(() => {
        const updatedLimit = !name ? 0 : limit
        setTimeLimit(updatedLimit)
    }, [limit])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "0" ? Infinity : Number(e.target.value)
        if (!isNaN(value)) {
            setTimeLimit(value)
            return
        }
    }

    const handleSave = () => {
        onSave(timeLimit)
    }

    return (
        <div>
            <span>Enter limit in mins</span>
            <div className={styles.limit_container}>
            <input
                type="text"
                className={styles.input_box}
                value={timeLimit === Infinity ? 0 : timeLimit}
                onChange={handleChange}
            />
                <button
                    className={styles.save_btn}
                    onClick={handleSave}
                    disabled={timeLimit === limit}
                >
                    Save
                </button>
            </div>
        </div>
    )
}