import { 
    resetAppsTime,
    scheduleReset,
    mostUsedCategory,
    getCategorySummary,
} from "../additionalFeatures"

test("should reset all apps time", () => {
    const apps = {
        "social" : {
            "facebook": 60,
            "instagram": 30,
            "snapchat": 15
        },
        "entertainment" : {
            "youtube": 120,
            "netflix": 45,
            "spotify": 90
        }
    }
    resetAppsTime(apps)

    expect(apps.social.facebook).toBe(0)
    expect(apps.entertainment.spotify).toBe(0)
})

test("should schedule a reset", () => {
    jest.useFakeTimers()
    const apps = {
        "social" : {
            "facebook": 60,
            "instagram": 30,
            "snapchat": 15
        },
        "entertainment" : {
            "youtube": 120,
            "netflix": 45,
            "spotify": 90
        }
    }
    const delay = 3000

    scheduleReset(apps, delay)

    expect(apps.social.facebook).toBe(60)
    expect(apps.entertainment.spotify).toBe(90)

    jest.advanceTimersByTime(delay)

    expect(apps.social.facebook).toBe(0)
    expect(apps.entertainment.spotify).toBe(0)
    jest.useRealTimers()
})

test("should return most used category", () => {
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
    expect(mostUsedCategory(apps)).toEqual({category : "entertainment", totalTime: 255})
})

test("should generate summary of all categories and their respective usage times", () => {
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
    expect(getCategorySummary(apps)).toEqual({
        "social": 105,
        "productivity": 185,
        "entertainment": 255
    })
})
