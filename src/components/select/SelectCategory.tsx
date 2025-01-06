import { useState } from "react";
import { useData } from "../../hooks/useData";
import Select from '../common/select/Select'
import SetLimit from "../limit/SetLimit";
import SelectApp from "./SelectApp";
import { useCategory } from "../../hooks/useCategory";
import { useApp } from "../../hooks/useApp"
import '../../App.css'

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

    return (
        <>
            <div className="select-app-container">
                <Select
                    options={categories}
                    selectedOption={selectedCategory}
                    setSelectedOption={setSelectedCategory}
                    placeholder="Select Category"
                    onOptionClick={onOptionClick}
                    className="select-box"
                />
                <div className="limit-container">
                    {showLimit && <SetLimit
                        type="category"
                        name={selectedCategory}
                        limit={data[selectedCategory]?.categoryLimit}
                        onSave={handleLimitUpdate}
                        // isAlertVisible={isAlertVisible}
                        // setIsAlertVisible={setIsAlertVisible}
                    />}
                </div>
            </div>
            {showApps && <SelectApp />}
        </>
    )
}