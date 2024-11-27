import { SET_OFFER_DONE, SET_OFFER_INFO, SET_OFFER_MODAL_VISIBLE, SET_OFFER_REWARD, SET_OFFERS } from "./types"

export const actionSetOffers = (offers) => {
    return {
        type: SET_OFFERS,
        payload: offers
    }
}
export const actionSetOfferInfo = (id) => {
    return {
        type: SET_OFFER_INFO,
        payload: id
    }
}
export const actionSetOfferModalVisible = (boolean) => {   
    return {
        type: SET_OFFER_MODAL_VISIBLE,
        payload: boolean
    }
}

export const actionSetOfferReward = (reward) => {
    return {
        type: SET_OFFER_REWARD,
        payload: reward
    }
}
export const actionSetOfferDone = (id) => {
    return {
        type: SET_OFFER_DONE,
        payload: id
    }
}
