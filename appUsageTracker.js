import { addUsageTimeToTotal } from "./utils"

export function logAppUsage(category, appName, usageTime){
    const apps = {
        "social" : {
            "facebook": 60,
            "instagram": 30,
            "snapchat": 15
        },
        "productivity" : {
            "slack": 75,
            "googledocs": 50,
            "zoom": 60
        },
        "entertainment" : {
            "youtube": 120,
            "netflix": 45,
            "spotify": 90
        }
    }

    const convertedCategory = category.toLowerCase()
    const convertedAppName = appName.toLowerCase()
    
    if(!apps[convertedCategory]) {
        return { status: "Failed", reason: `${category} category does not exist` }
    }
    if(!apps[convertedCategory][convertedAppName]){
        return { status: "Failed", reason: `${appName} does not belong to ${category} category` }
    }

    const updatedTime = addUsageTimeToTotal(usageTime, apps[convertedCategory][convertedAppName])

    apps[convertedCategory][convertedAppName] = updatedTime
    return { status: "Success", reason: `Added usage time for ${appName} in the ${category} category` }
}

// console.log(logAppUsage("entertainment", "spotify", "15"))