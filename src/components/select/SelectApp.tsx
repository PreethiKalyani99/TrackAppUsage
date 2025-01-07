import { useState, useEffect } from "react";
import { useData } from "../../hooks/useData";
import { useCategory } from "../../hooks/useCategory";
import { useApp } from "../../hooks/useApp";
import Select from "../common/select/Select";
import SetLimit from "../limit/SetLimit";
import AddUsageTime from "../usage/AddUsageTime";
import styles from "./Select.module.css"

export default function SelectApp() {
    const [showLimit, setShowLimit] = useState<boolean>(false)
    const [showUsage, setShowUsage] = useState<boolean>(false)

    const { data, setData } = useData()
    const { selectedApp, setSelectedApp } = useApp()
    const { selectedCategory } = useCategory()

    let options: string[] = []

    useEffect(() => {
        if (selectedApp) {
            setShowLimit(true)
        } else {
            setShowLimit(false)
        }
    }, [selectedApp])
    
    const onOptionClick = () =>  setShowUsage(true)

    if (selectedCategory) {
        options = Object.keys(data[selectedCategory].apps)
    }

    const handleLimitUpdate = (newLimit: number) => {
        setData((prevData) => {
            return {
                ...prevData,
                [selectedCategory]: {
                    ...prevData[selectedCategory],
                    apps: {
                        ...prevData[selectedCategory].apps,
                        [selectedApp]: {
                            ...prevData[selectedCategory].apps[selectedApp],
                            limit: newLimit
                        }
                    }
                }
            }
        })
    }
    return (
        <div className={styles.select_app_container}>
            <Select
                options={options}
                selectedOption={selectedApp}
                setSelectedOption={setSelectedApp}
                placeholder="Select App"
                className={styles.select_box}
                onOptionClick={onOptionClick}
            />
            <div className={styles.limit_container}>
                {showLimit &&
                    <SetLimit
                        type="app"
                        name={selectedApp}
                        limit={data[selectedCategory].apps[selectedApp]?.limit}
                        onSave={handleLimitUpdate}
                    />
                }
            </div>
            {(showUsage && showLimit) &&
                <div>
                    <AddUsageTime />
                </div>
            }
        </div>
    )
}