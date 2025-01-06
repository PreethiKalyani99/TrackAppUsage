import { Apps } from "../types/types";

interface CategorySummary {
    [category: string]: number
}

export function getCategorySummary(apps: Apps){
    const categorySummary: CategorySummary = {}

    for(const category in apps){
        let temp: number = 0
        for(const app in apps[category].apps){
            temp += apps[category].apps[app].usageTime
        }
        categorySummary[category] = temp
    }
    return categorySummary
}