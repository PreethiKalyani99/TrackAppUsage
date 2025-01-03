const fn = require("./utils")
const { scheduleReset, clearTimers } = require('./additionalFeatures')

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

function logAppUsage(category, appName, usageTime){
    const convertedCategory = category.toLowerCase()
    const convertedAppName = appName.toLowerCase()
    
    if(!apps[convertedCategory]) {
        return apps
    }
    if(!apps[convertedCategory][convertedAppName]){
        return apps[convertedCategory]
    }

    const updatedTime = fn.addUsageTimeToTotal(usageTime, apps[convertedCategory][convertedAppName])

    apps[convertedCategory][convertedAppName] = updatedTime
    return apps[convertedCategory]
}

// scheduleReset()
// clearTimers()
// console.log(logAppUsage("entertainment", "spotify", "15"))

module.exports = {
    apps,
    logAppUsage,
}