import { SET_AUTOBOT, SET_AUTOBOT_COLLECTED, SET_AUTOBOT_LAST_LAUNCH_TIME, SET_AUTOBOT_READY_TO_COLLECT, SET_AUTOBOT_READY_TO_LAUNCH, SET_AUTOBOT_STOP, SET_LAUCH_INFO, UPDATE_AUTOBOT_LEVEL } from "./types";

const initialState = {
    launch: {
        lastShutdownTime: '',
    },
    autoBots: []
}

export const autobotReducer = (state = initialState, action) => {        
    switch (action.type) {
        case SET_AUTOBOT:
            const autoBots = action.payload.autoBots
            const sortedAutoBots = autoBots.map((autoBot) => {
            return {
                    ...autoBot,
                    levels: autoBot.levels.sort((a, b) => a.level - b.level)
                }
            })
            return {...state, autoBots: sortedAutoBots}
        case SET_LAUCH_INFO:
            return {...state, launch: action.payload}
        case SET_AUTOBOT_STOP:
            return {...state, launch: {...state.launch, playerAutoBot: { ...state.launch.playerAutoBot, isActive: false, canCollect: true } }}
        case SET_AUTOBOT_COLLECTED:
            return {...state, isComplete: false}
        case SET_AUTOBOT_READY_TO_COLLECT:
            return {...state, launch: {...state.launch, playerAutoBot: { ...state.launch.playerAutoBot, canCollect: true } }}
        case SET_AUTOBOT_READY_TO_LAUNCH:
            return {...state, isComplete: false, isActive: false}
        case SET_AUTOBOT_LAST_LAUNCH_TIME:
            return { ...state, launch: { ...state.launch, lastShutdownTime: action.payload } }
        case UPDATE_AUTOBOT_LEVEL:
            return { ...state, autoBots: { ...state.autoBots, [0]: { ...state.autoBots[0], currentLevel: state.autoBots[0].currentLevel + 1 } } }
        default: return state
    }
}
