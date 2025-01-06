export function isLimitExceeded(
    categoryLimit: number, 
    appLimit: number, 
    usageTime: number, 
    appName: string,
    categoryName: string
){
    console.log(usageTime, categoryLimit, appLimit, "==================")
    if(usageTime > categoryLimit || usageTime > appLimit){
        return { status: "Failed", reason: `Timer limit reached for ${!appName ? categoryName: appName}`}
    } 
    return { status: "Success", reason: `${!appName ? categoryName: appName} usage time does not exceed the limit`}
}   