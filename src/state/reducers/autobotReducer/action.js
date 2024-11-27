import { SET_AUTOBOT, SET_AUTOBOT_COLLECTED, SET_AUTOBOT_LAST_LAUNCH_TIME, SET_AUTOBOT_READY_TO_COLLECT, SET_AUTOBOT_READY_TO_LAUNCH, SET_AUTOBOT_START, SET_AUTOBOT_STOP, SET_LAUCH_INFO, UPDATE_AUTOBOT_LEVEL } from "./types"

export const actionSetAutobot = (data) => {    
    return {
        type: SET_AUTOBOT,
        payload: data
    }
}
export const actionSetAutobotLauchInfo = (data) => {
    return {
        type: SET_LAUCH_INFO,
        payload: data
    }
}
export const actionSetAutobotStart = () => {
    return {
        type: SET_AUTOBOT_START
    }
}
export const actionSetAutobotStop = () => {    
    return {
        type: SET_AUTOBOT_STOP
    }
}
export const actionSetAutobotCollected = () => {
    return {
        type: SET_AUTOBOT_COLLECTED
    }
}
export const actionSetAutobotReadyToLaunch = () => {
    return {
        type: SET_AUTOBOT_READY_TO_LAUNCH
    }
}
export const actionSetAutobotLastLaunchTime = (time) => {
    return {
        type: SET_AUTOBOT_LAST_LAUNCH_TIME,
        payload: time
    }
}
export const actionSetAutobotReadyToCollect = () => {
    return {
        type: SET_AUTOBOT_READY_TO_COLLECT
    }
}
export const actionUpdateAutoBotLevel = () => {
    return {
        type: UPDATE_AUTOBOT_LEVEL
    }
}