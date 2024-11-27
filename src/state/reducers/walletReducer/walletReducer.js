import { REMOVE_USER_WALLET, SET_CONNECT_WALLET_VISIBLE, SET_USER_WALLET } from "./types"

const initialState = {
    isVisible: false,
    walletAdress: null
}

export const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONNECT_WALLET_VISIBLE:
            return {...state, isVisible: action.payload}    
        case SET_USER_WALLET:
            return {...state, walletAdress: action.payload}
        case REMOVE_USER_WALLET:
            return {...state, walletAdress: null}
        default: return state
    }
}