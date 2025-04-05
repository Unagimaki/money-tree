
export const SET_BONUS_WINDOW_VISIBLE = 'SET_BONUS_WINDOW_VISIBLE'
export const SET_DAILY_BONUS = 'SET_DAILY_BONUS'
export const SET_DAILY_BONUS_COLLECTED = 'SET_DAILY_BONUS_COLLECTED'
export const SET_DAILY_MODAL_VISIBLE = 'SET_DAILY_MODAL_VISIBLE'
export const SET_CURRENT_DAILY_PRIZE = 'SET_CURRENT_DAILY_PRIZE'

export const actionSetBonusWindowVisible = (boolean) => {
    return {
        type: SET_BONUS_WINDOW_VISIBLE,
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
    console.log(id);
    
    return {
        type: SET_DAILY_BONUS_COLLECTED,
        payload: id
    }
}
export const actionSetModalVisible = (boolean) => {
    return {
        type: SET_DAILY_MODAL_VISIBLE,
        payload: boolean
    }
}
export const actionSetCurrentDailyPrize = (amount, prizeType) => {
    return {
        type: SET_CURRENT_DAILY_PRIZE,
        payload: {
            amount,
            prizeType
        }
    }
}
const initialState = {
    isBonusWindowVisible: false,
    bonus: {},
    dailyModalVisible: false,
    currentPrize: {
        amount: 0,
        prizeType: ''
    }
}


export const dailyBonusReducer = (state = initialState, action) => {    
    switch (action.type) {
        case SET_BONUS_WINDOW_VISIBLE:
            return {...state, isBonusWindowVisible: action.payload}
        case SET_DAILY_BONUS:
            return {...state, bonus: action.payload}
        case SET_DAILY_BONUS_COLLECTED:
            return {
                ...state,
                bonus: {
                    ...state.bonus,
                    dailyBonuses: state.bonus.dailyBonuses.map(item =>
                        item.id === action.payload
                            ? { ...item, isAvailable: false, isCollected: true }
                            : item
                    )
                }
            };
        case SET_DAILY_MODAL_VISIBLE:
            return {
                ...state, 
                dailyModalVisible: action.payload
        };
        case SET_CURRENT_DAILY_PRIZE: 
            return {
                ...state,
                currentPrize: {
                    amount: action.payload.amount,
                    prizeType: action.payload.prizeType
            }
        };

        default: return state
    }
}