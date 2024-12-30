import { SET_CONNECT_WALLET_VISIBLE, SET_USER_WALLET, SET_USER_WALLET_ADDRESS } from "./types"

export const actionSetConnectModalVisible = (visible) => {
    return {
        type: SET_CONNECT_WALLET_VISIBLE,
        payload: visible
    }
}

export const actionSetUserWallet = (wallet) => {
    return {
        type: SET_USER_WALLET,
        payload: wallet
    }
}

export const actionSetUserWalletAddress = (address = null) => {
    return {
        type: SET_USER_WALLET_ADDRESS,
        payload: address
    }
}