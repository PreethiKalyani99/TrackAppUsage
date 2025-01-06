import React, { useState, useMemo, createContext, useContext } from "react";

interface CategoryContextValue {
    selectedCategory: string
    setSelectedCategory:  React.Dispatch<React.SetStateAction<string>>
}

export const CategoryContext = createContext<CategoryContextValue>({
    selectedCategory: "",
    setSelectedCategory: () => {}
})

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("")

    const value = useMemo(() => {
        return {
            selectedCategory,
            setSelectedCategory,
        }
    }, [selectedCategory])
    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
}

export const useCategory = () => useContext(CategoryContext)