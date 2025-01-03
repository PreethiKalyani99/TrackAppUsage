const { resetAppsTime, scheduleReset, mostUsedCategory, getCategorySummary } = require('../additionalFeatures')
const { apps } = require('../appUsageTracker')

jest.mock('../appUsageTracker', () => ({
    apps: {
        "social": {
            "facebook": 60,
            "instagram": 30,
            "snapchat": 15
        },
        "productivity": {
            "slack": 75,
            "googledocs": 50,
            "zoom": 60
        },
        "entertainment": {
            "youtube": 120,
            "netflix": 45,
            "spotify": 90
        }
    }
}))


// jest.useFakeTimers()

// test("should reset all apps time", () => {
//     resetAppsTime()

//     jest.advanceTimersByTime(1000)
//     expect(apps.social.facebook).toBe(0)
//     expect(apps.entertainment.spotify).toBe(0)
// })

// test("should schedule a reset", () => {
//     scheduleReset()
//     jest.advanceTimersByTime(5000)
//     expect(apps.social.facebook).toBe(0)
//     expect(apps.entertainment.spotify).toBe(0)
// })

test("should return most used category", () => {
    expect(mostUsedCategory()).toEqual({category : "entertainment", totalTime: 255})
})

test("should generate summary of all categories and their respective usage times", () => {
    expect(getCategorySummary()).toEqual({
        "social": 105,
        "productivity": 185,
        "entertainment": 255
    })
})
