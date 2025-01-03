const { apps } = require('./appUsageTracker')

let intervalID, timeoutID

function resetAppsTime(){
    for(const category in apps){
        for(const app in apps[category]){
            apps[category][app] = 0
        }
    }
}

function scheduleReset(){
    const now = new Date()
    const midNight = new Date(now)
    midNight.setHours(24,0,0,0)

    const timeUntilMidnight = midNight - now

    timeoutID = setTimeout(() => {

        if(intervalID){
            clearInterval(intervalID)
        }

        intervalID = setInterval(() => {
            resetAppsTime(apps)
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

function getCategorySummary(){
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

function mostUsedCategory() {
    const obj = getCategorySummary()

    return Object.entries(obj).reduce((acc, [key, value]) => {
        return value > acc.totalTime 
            ? { category: key, totalTime: value }
            : acc
    }, { category: '', totalTime: 0 })
}



module.exports = {
    resetAppsTime,
    scheduleReset,
    clearTimers,
    mostUsedCategory,
    getCategorySummary
}