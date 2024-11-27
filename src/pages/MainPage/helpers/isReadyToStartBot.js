
export const isReadyToStartBot = (iso = 0) => {
    const DateNow = new Date()
    const lastLaunchDate = new Date(iso)
    // console.log(lastLaunchDate);
    
    const diffInMs = DateNow.getTime() - lastLaunchDate.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)
    
    return diffInHours >= 24        
}