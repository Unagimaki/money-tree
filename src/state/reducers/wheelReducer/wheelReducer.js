const initialState = {
    prizes: [],
    wheelModalVisible: false,
    currentPrize: {
        amount: 1,
        prizeType: ''
    }
};

const SET_PRIZES = 'SET_PRIZES';
const SET_CURRENT_PRIZE = 'SET_CURRENT_PRIZE'
const SET_WHEEL_MODAL_VISIBLE = 'SET_WHEEL_MODAL_VISIBLE'

export const actionSetPrizes = (arr) => {
    return {
        type: SET_PRIZES,
        payload: arr
    }
}
export const actionSetModalVisible = (boolean) => {
    return {
        type: SET_WHEEL_MODAL_VISIBLE,
        payload: boolean
    }
}
export const actionSetCurrentPrize = (amount, prizeType) => {
    return {
        type: SET_CURRENT_PRIZE,
        payload: {
            amount,
            prizeType
        }
    }
}
export const wheelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRIZES:
            return {
                ...state,
                prizes: action.payload
            };
        case SET_WHEEL_MODAL_VISIBLE:
            return {
                ...state, 
                wheelModalVisible: action.payload
            };
        case SET_CURRENT_PRIZE: 
            return {
                ...state,
                currentPrize: {
                    amount: action.payload.amount,
                    prizeType: action.payload.prizeType
                }
            };
        default:
            return state;
    }
};

