
export const SET_BONUS_VISIBLE = 'SET_BONUS_VISIBLE'
export const SET_DAILY_BONUS = 'SET_DAILY_BONUS'
export const SET_DAILY_BONUS_COLLECTED = 'SET_DAILY_BONUS_COLLECTED'

export const actionSetBonusWindowVisible = (boolean) => {
    return {
        type: SET_BONUS_VISIBLE,
        payload: boolean
    }
}
export const actionSetDailyBonus = (data) => {
    return {
        type: SET_DAILY_BONUS,
        payload: data
    }
}
export const actionSetBonusCollected = (id) => {
    return {
        type: SET_DAILY_BONUS_COLLECTED,
        payload: id
    }
}
const initialState = {
    isBonusWindowVisible: false,
    bonus: []
}


export const dailyBonusReducer = (state = initialState, action) => {    
    switch (action.type) {
        case SET_BONUS_VISIBLE:
            return {...state, isBonusWindowVisible: action.payload}
        case SET_DAILY_BONUS:
            return {...state, bonus: action.payload}
        case SET_DAILY_BONUS_COLLECTED:
            return {
                ...state,
                bonus: state.bonus.map(item =>
                    item.id === action.payload
                        ? { ...item, isAvailable: false, isCollected: true }
                        : item
                )
            };
        default: return state
    }
}