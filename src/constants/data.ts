import { Apps } from "../types/types"

export const categoriesAndApps: Apps = {
    "social": {
        categoryLimit: Infinity,
        apps: {
            "facebook": { usageTime: 60, limit: Infinity },
            "instagram": { usageTime: 30, limit: Infinity },
            "snapchat": { usageTime: 15, limit: Infinity }
        }
    },
    "productivity": {
        categoryLimit: Infinity,
        apps: {
            "slack": { usageTime: 75, limit: Infinity },
            "googledocs": { usageTime: 50, limit: Infinity },
            "zoom": { usageTime: 60, limit: Infinity }
        }
    },
    "entertainment": {
        categoryLimit: Infinity,
        apps: {
            "youtube": { usageTime: 120, limit: Infinity },
            "netflix": { usageTime: 45, limit: Infinity },
            "spotify": { usageTime: 90, limit: Infinity }
        }
    }
}