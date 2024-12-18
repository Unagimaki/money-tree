
export const SET_BONUS_VISIBLE = 'SET_BONUS_VISIBLE'
export const SET_DAILY_BONUS = 'SET_DAILY_BONUS'

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
        default: return state
    }
}