export function isLimitExceeded(
    categoryLimit: number, 
    appLimit: number , 
    usageTime: number
){
    if(usageTime > categoryLimit || usageTime > appLimit){
        return true
    } 
    return false
}   