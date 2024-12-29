import { SET_CONNECT_WALLET_VISIBLE, SET_USER_WALLET, SET_USER_WALLET_ADDRESS } from "./types"

const initialState = {
    isVisible: false,
}

export const walletReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONNECT_WALLET_VISIBLE:
            return {...state, isVisible: action.payload}
        case SET_USER_WALLET:
            return {
                ...state, userWallet: action.payload
            }
        case SET_USER_WALLET_ADDRESS:
            return {
                ...state,
                userWallet: {
                    ...state.userWallet,
                    address: {
                        ...state.userWallet.address,
                        address: action.payload,  // Обновляем поле address в объекте address
                    },
                },
            };
        default: return state
    }
}

