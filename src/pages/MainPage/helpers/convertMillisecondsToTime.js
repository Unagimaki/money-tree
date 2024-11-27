export const convertMillisecondsToTime = (milliseconds) => {
    const seconds = milliseconds / 1000
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const remainingMinutes = minutes % 60
    return {
        hours: hours,
        minutes: remainingMinutes,
        seconds: remainingSeconds
    }
}