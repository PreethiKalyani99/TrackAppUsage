import { logAppUsage } from "../appUsageTracker"

test("should return the original object when category does not match", () => {
    expect(logAppUsage("Shopping", "Amazon", "30")).toEqual({
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
    })
})

test("should return given category from original object when app name does not match", () => {
    expect(logAppUsage("Social", "Spotify", "1")).toEqual({
        "facebook": 60,
        "instagram": 30,
        "snapchat": 15
    })
})

test("should add usage time to the total time when the given category and app name match", () => {
    expect(logAppUsage("entertainment", "spotify", "15")).toEqual({
        "youtube": 120,
        "netflix": 45,
        "spotify": 105
    })
})