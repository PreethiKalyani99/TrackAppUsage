export function isLimitExceeded(categoryLimit, appLimit, usageTime, appName){
    if(usageTime > categoryLimit || usageTime > appLimit){
        return { status: "Failed", reason: `Timer limit reached for ${appName}`}
    } 
    return { status: "Success", reason: `${appName} usage time does not exceed the limit`}
}   

export function pauseTimer(category, appName){
    return { status: "Paused", reason: `${appName} is paused right now, so it won't be added to the ${category} category` }
}

export function resetAppTimer(apps, category, appName){
    const convertedCategory = category.toLowerCase()
    const convertedAppName = appName.toLowerCase()

    if(!apps[convertedCategory]) {
        return { status: "Failed", reason: `${category} category does not exist` }
    }
    if(!apps[convertedCategory][convertedAppName]){
        return { status: "Failed", reason: `${appName} does not belong to ${category} category` }
    }
    apps[convertedCategory[convertedAppName]] = 0

    return {status: "Success", reason: `${appName}'s timer has been reset in the ${category} category`}

}