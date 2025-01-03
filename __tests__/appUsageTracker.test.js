const fn = require('../appUsageTracker')

test("should return the original object when category does not match", () => {
    expect(fn.logAppUsage("Shopping", "Amazon", "30")).toEqual({
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
    })
})

test("should return given category from original object when app name does not match", () => {
    expect(fn.logAppUsage("Social", "Spotify", "1")).toEqual({
        "facebook": "1h",
        "instagram": "30m",
        "snapchat": "15m"
    })
})

test("should add usage time to the total time when the given category and app name match", () => {
    expect(fn.logAppUsage("entertainment", "spotify", "15")).toEqual({
        "youtube": "2h",
        "netflix": "45m",
        "spotify": "1h45m"
    })
})

   
test("should reset all apps time", () => {
    fn.resetAppsTime()
    expect(fn.apps.social.facebook).toBe("0m")
    expect(fn.apps.entertainment.spotify).toBe("0m")
})

jest.useFakeTimers()

test("should schedule a reset", () => {
    fn.scheduleReset()
    jest.advanceTimersByTime(5000)
    expect(fn.apps.social.facebook).toBe("0m")
})