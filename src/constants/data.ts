import { Apps } from "../types/types"

export const categoriesAndApps: Apps = {
    "social": {
        categoryLimit: 0,
        apps: {
            "facebook": { usageTime: 60, limit: 0 },
            "instagram": { usageTime: 30, limit: 0 },
            "snapchat": { usageTime: 15, limit: 0 }
        }
    },
    "productivity": {
        categoryLimit: 0,
        apps: {
            "slack": { usageTime: 75, limit: 0 },
            "googledocs": { usageTime: 50, limit: 0 },
            "zoom": { usageTime: 60, limit: 0 }
        }
    },
    "entertainment": {
        categoryLimit: 0,
        apps: {
            "youtube": { usageTime: 120, limit: 0 },
            "netflix": { usageTime: 45, limit: 0 },
            "spotify": { usageTime: 90, limit: 0 }
        }
    }
}