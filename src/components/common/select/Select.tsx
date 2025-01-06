import React, { useState } from "react";
import styles from "./Select.module.css"

interface SelectProps {
    options: string[]
    selectedOption: string
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>
    placeholder?: string
    onOptionClick?: () => void
    className?: string
}

export default function Select({
    options,
    placeholder = "Select...",
    onOptionClick,
    className = "",
    selectedOption,
    setSelectedOption
}: SelectProps) {
    const [focused, setFocused] = useState<boolean>(false)
    const [isOptionVisible, setIsOptionVisible] = useState<boolean>(false)

    const handleSelect = (option: string) => {
        setSelectedOption(option)
        onOptionClick && onOptionClick()
        setIsOptionVisible(false)
        return
    }

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        if (selectedOption.length === 0) {
            setFocused(false)
        }
    }

    const toggleOption = () => setIsOptionVisible(true)

    return (
        <div className={`${styles.container} ${className}`}>

            <div
                className={`${styles.select_box} ${focused ? styles.focused : ""}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={toggleOption}
                tabIndex={0}
            >
                {selectedOption.length === 0 ?
                    <PlaceHolder placeholderText={placeholder} />
                    :
                    <>
                        <SelectedOption
                            option={selectedOption}
                        />
                        <div className={styles.border_text}>{placeholder}</div>
                    </>
                }
            </div>

            {isOptionVisible &&
                (
                    <div className={styles.option_container}>
                        {options.map(option => (
                            <Option
                                key={option}
                                option={option}
                                selectedOption={selectedOption}
                                onSelect={handleSelect}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    )
}

interface PlaceholderProps {
    placeholderText: string
}

function PlaceHolder({ placeholderText }: PlaceholderProps) {
    return (
        <div className={styles.placeholder}>{placeholderText}</div>
    )
}

interface SelectedOptionProps {
    option: string
}

function SelectedOption({ option }: SelectedOptionProps) {
    return (
        <>
            <div
                key={option}
            >
                {option}
            </div>
        </>
    )
}

interface OptionProps {
    option: string
    selectedOption: string
    onSelect: (option: string) => void
}

function Option({ option, selectedOption, onSelect }: OptionProps) {
    const isOptionSelected = selectedOption === option
    return (
        <div
            className={`${styles.option} ${isOptionSelected ? styles.selected : ""}`}
            onClick={() => onSelect(option)}
        >
            <span>{option}</span>
        </div>
    )
}