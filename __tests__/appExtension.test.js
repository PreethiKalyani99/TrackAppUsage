import { isLimitExceeded, pauseTimer, resetAppTimer } from "../appExtension";

test("should return failed status when usage time is greater app limit", () => {
    expect(isLimitExceeded(60, 30, 60, "Spotify")).toEqual({ status: "Failed", reason: "Timer limit reached for Spotify"})
})

test("should return failed status when usage time is greater than category limit", () => {
    expect(isLimitExceeded(20, 30, 25, "Spotify")).toEqual({ status: "Failed", reason: "Timer limit reached for Spotify"})
})

test("should return paused status for a particular app", () => {
    expect(pauseTimer("Social", "Instagram")).toEqual({ status: "Paused", reason: `Instagram is paused right now, so it won't be added to the Social category` })
})

test("should reset timer for a particular app", () => {
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
        }
    }

    expect(resetAppTimer(apps, "Social", "Snapchat")).toEqual({status: "Success", reason: "Snapchat's timer has been reset in the Social category"})
})

test("should return failed status when category does not match", () => {
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
        }
    }
    expect(resetAppTimer(apps, "Shopping", "Amazon")).toEqual({"status": "Failed", "reason": "Shopping category does not exist"})
})

test("should return failed status when app name does not match", () => {
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
        }
    }
    expect(resetAppTimer(apps, "Social", "Spotify")).toEqual({"status": "Failed", "reason": "Spotify does not belong to Social category"})
})