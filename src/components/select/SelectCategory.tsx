import { useState } from "react";
import { useData } from "../../hooks/useData";
import Select from '../common/select/Select'
import SetLimit from "../limit/SetLimit";
import SelectApp from "./SelectApp";
import { useCategory } from "../../hooks/useCategory";
import { useApp } from "../../hooks/useApp"
import styles from "./Select.module.css"

interface App {
    usageTime: number
    limit: number
}
export default function SelectCategory() {
    const [showLimit, setShowLimit] = useState<boolean>(false)
    const [showApps, setShowApps] = useState<boolean>(false)

    const { data, setData } = useData()

    const { setSelectedApp } = useApp()
    const { selectedCategory, setSelectedCategory } = useCategory()

    const categories = Object.keys(data)

    const onOptionClick = () => {
        setSelectedApp("")
        setShowApps(true)
        setShowLimit(true)
    }

    const handleLimitUpdate = (newLimit: number) => {
        setData((prevData) => {
            return {
                ...prevData,
                [selectedCategory]: {
                    ...prevData[selectedCategory],
                    categoryLimit: newLimit
                }
            }
        })
    }

    const handleResetLimit = () => {
        const resetAppsLimit = Object.entries(data[selectedCategory].apps).reduce((acc, [key, value]) => {
            acc[key] = {
                ...value,
                limit: Infinity,
            }
            return acc
        }, {} as Record<string, App>)
        
        setData((prevData) => {
            return {
                ...prevData,
                [selectedCategory]: {
                    categoryLimit: Infinity,
                    apps: resetAppsLimit
                }
            }
        })
    }

    return (
        <>
            <div className={styles.select_app_container}>
                <Select
                    options={categories}
                    selectedOption={selectedCategory}
                    setSelectedOption={setSelectedCategory}
                    placeholder="Select Category"
                    onOptionClick={onOptionClick}
                    className={styles.select_box}
                />
                <div className={styles.limit_container}>
                    {showLimit &&
                        <div>
                            <SetLimit
                                type="category"
                                name={selectedCategory}
                                limit={data[selectedCategory]?.categoryLimit}
                                onSave={handleLimitUpdate}
                            />
                            <button onClick={handleResetLimit}>Reset all limits in {selectedCategory} category</button>
                        </div>
                    }
                </div>
            </div>
            {showApps &&
                <SelectApp />
            }
        </>
    )
}