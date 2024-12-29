import { REMOVE_USER_WALLET, SET_CONNECT_WALLET_VISIBLE, SET_USER_WALLET, SET_USER_WALLET_ADDRESS, SET_WITHDRAWAL_TIME_LIMIT } from "./types"

const initialState = {
    isVisible: false,
    walletAdress: {},
}

export const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONNECT_WALLET_VISIBLE:
            return {...state, isVisible: action.payload}
        case SET_USER_WALLET:
            return {
                ...state, walletAdress: action.payload
            }
        case SET_USER_WALLET_ADDRESS:
            return {
                ...state, 
                wallet: {
                    ...state.wallet,
                    walletAdress: {
                    ...state.wallet.walletAdress,
                        address: {
                            ...state.wallet.walletAdress.address,
                            address: action.payload, // Здесь указывайте новое значение для address.address
                        }
                    }
                }
            };
        case REMOVE_USER_WALLET:
            return {...state, walletAdress: null}
        case SET_WITHDRAWAL_TIME_LIMIT:
            return {...state, walletAdress: { ...state.walletAdress, daysLeft: 3 }}
        default: return state
    }
}

