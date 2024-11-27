import { REMOVE_USER_WALLET, SET_CONNECT_WALLET_VISIBLE, SET_USER_WALLET } from "./types"

export const actionSetConnectModalVisible = (visible) => {
    return {
        type: SET_CONNECT_WALLET_VISIBLE,
        payload: visible
    }
}

export const actionSetUserWallet = (wallet) => {
    return {
        type: SET_USER_WALLET,
        wallet
    }
}

export const actionRemoveUserWallet = (wallet) => {
    return {
        type: REMOVE_USER_WALLET,
    }
}