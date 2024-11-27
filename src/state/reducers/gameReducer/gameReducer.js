export const CAN_PLAY = 'CAN_PLAY'

export const actionSetCanPlay = (boolean) => {
    return {
        type: CAN_PLAY,
        payload: boolean
    }
}

export const gameReducer = (state = true, action) => {
    switch (action.type) {
        case CAN_PLAY:
            return action.payload
        default: return state
    }
}