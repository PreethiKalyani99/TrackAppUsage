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

function addUsageTimeToTotal(usageTime, totalTime){
    const [totalHours, totalMinutes] = parseTime(totalTime)

    const addedMins = totalMinutes + Number(usageTime)

    return formatTime(totalHours, addedMins)
}

module.exports = {
    parseTime,
    formatTime,
    addUsageTimeToTotal,
}