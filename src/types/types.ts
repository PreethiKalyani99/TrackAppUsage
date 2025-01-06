type App = {
    usageTime: number
    limit: number
}

type Category = {
    categoryLimit: number
    apps: Record<string, App>
}

export type Apps = {
    [category: string]: Category
}