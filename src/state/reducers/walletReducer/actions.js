import { REMOVE_USER_WALLET, SET_CONNECT_WALLET_VISIBLE, SET_USER_WALLET, SET_WITHDRAWAL_TIME_LIMIT } from "./types"

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

export const actionSetUserWalletAddress = (address) => {
    return {
        type: SET_WITHDRAWAL_TIME_LIMIT,
        payload: address
    }
}