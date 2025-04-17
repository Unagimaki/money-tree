const initalState = {
    prizes: []
}

const SET_PRIZES = 'SET_PRIZES'

export const actionSetPrizes = (arr) => {
    return {
        type: SET_PRIZES,
        payload: arr
    }
}

export const historyPrizesReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_PRIZES:
            return {
                ...state,
                prizes: action.payload
            }
    
        default: return state
    }
}