import { logAppUsage } from "../appUsageTracker"

test("should return failed status when category does not match", () => {
    expect(logAppUsage("Shopping", "Amazon", "30")).toEqual({"status": "Failed", "reason": "Shopping category does not exist"})
})

test("should return failed status when app name does not match", () => {
    expect(logAppUsage("Social", "Spotify", "1")).toEqual({"status": "Failed", "reason": "Spotify does not belong to Social category"})
})

test("should add usage time to the total time when the given category and app name match", () => {
    expect(logAppUsage("entertainment", "spotify", "15")).toEqual({"status": "Success", "reason": "Added usage time for spotify in the entertainment category"})
})