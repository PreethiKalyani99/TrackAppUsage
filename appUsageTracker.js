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

function parseTime(input){
    let hours = 0, minutes = 0
    const timeParts = input.match(/(\d+)(h|m)/g) || []

    timeParts.forEach(time => {
        if(time.endsWith('h')){
            hours += parseInt(time)
        }
        else if(time.endsWith('m')){
            minutes += parseInt(time)
        }
    })
    return [hours, minutes]
}

function formatTime(hours, mins){
    const hrs = hours + Math.floor(mins / 60)
    const min = mins % 60

    return  `${hrs}h${min}m`
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
    
    const [hours, minutes] = parseTime(usageTime)
    const [totalHours, totalMinutes] = parseTime(apps[convertedCategory][convertedAppName])

    const addedHours = totalHours + hours
    const addedMins = totalMinutes + minutes

    const updatedTime = formatTime(addedHours, addedMins)

    apps[convertedCategory][convertedAppName] = updatedTime
    return apps[convertedCategory]
}

console.log(logAppUsage("Shopping", "Amazon", "30m"))
console.log(logAppUsage("Social", "Spotify", "1h"))
console.log(logAppUsage("entertainment", "spotify", "15m"))