const fn = require("./utils")

const apps = {
    "social" : {
        "facebook": "1h",
        "instagram": "30m",
        "snapchat": "15m"
    },
    "productivity" : {
        "slack": "1h15m",
        "googledocs": "50m",
        "zoom": "1h"
    },
    "entertainment" : {
        "youtube": "2h",
        "netflix": "45m",
        "spotify": "1h30m"
    }
}
let intervalID, timeoutID

function resetAppsTime(){
    for(const category in apps){
        for(const app in apps[category]){
            apps[category][app] = "0m"
        }
    }
}

function scheduleReset(){
    const now = new Date()
    const midNight = new Date(now)
    midNight.setHours(24,0,0,0)

    const timeUntilMidnight = midNight - now

    timeoutID = setTimeout(() => {
        resetAppsTime()

        if(intervalID){
            clearInterval(intervalID)
        }

        intervalID = setInterval(() => {
            resetAppsTime()
        }, 86400000)

    }, timeUntilMidnight)
}

function clearTimers() {
    if (timeoutID){
        clearTimeout(timeoutID)
        timeoutID = null
    }
    if (intervalID){
        clearInterval(intervalID)
        intervalID = null
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

scheduleReset()
clearTimers()
// console.log(logAppUsage("entertainment", "spotify", "15"))

module.exports = {
    apps,
    logAppUsage,
    resetAppsTime,
    scheduleReset,
    clearTimers,
}