let timeoutID

function resetAppsTime(apps){
    for(const category in apps){
        for(const app in apps[category]){
            apps[category][app] = 0
        }
    }
}

function scheduleReset(apps, delay){

    timeoutID = setTimeout(() => {
        resetAppsTime(apps)
    }, delay)
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

function getCategorySummary(apps){
    const categorySummary = {}
    for(const category in apps){
        let temp = 0

        for(const app in apps[category]){
          temp += apps[category][app]
        }
        categorySummary[category] = temp
    }

    return categorySummary
}

function mostUsedCategory(apps) {
    const summary = getCategorySummary(apps)

    return Object.entries(summary).reduce((acc, [key, value]) => {
        return value > acc.totalTime 
            ? { category: key, totalTime: value }
            : acc
    }, { category: '', totalTime: 0 })
}

export {
    resetAppsTime,
    scheduleReset,
    clearTimers,
    getCategorySummary,
    mostUsedCategory,
}