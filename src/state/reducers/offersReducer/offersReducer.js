import { ADD_NEW_OFFER, SET_OFFER_DONE, SET_OFFER_INFO, SET_OFFER_MODAL_VISIBLE, SET_OFFER_REWARD, SET_OFFERS } from "./types"

const initialState = {
    isVisible: false,
    title: '',
    text: '',
    id: '',
    reward: '',
    url: '',
    imgUrl: '',
    isNew: '',
    linkToComplete: '',
    offers: []
}

export const offersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OFFERS:
            return {
                ...state,
                offers: action.payload.sort((a, b) => b.reward - a.reward)
            };
        case SET_OFFER_INFO:            
            const foundItem = state.offers.find(item => item.id === action.payload);
            return {
                ...state,
                title: foundItem ? foundItem.title : '',
                text: foundItem ? foundItem.description : '',
                id: foundItem ? foundItem.id : '',
                url: foundItem ? foundItem.url : '',
                imgUrl: foundItem ? foundItem.media.fileId : '',
                terms: foundItem ? foundItem.terms : '',
                isNew: foundItem ? foundItem.isNew : '',
                linkToComplete: foundItem ? foundItem.linkToComplete : '',
                offers: state.offers
            }
        case SET_OFFER_MODAL_VISIBLE:
            return {...state, isVisible: action.payload}
        case SET_OFFER_REWARD:
            return {...state, reward: action.payload}
        case SET_OFFER_DONE:
            return { ...state, offers: state.offers.map(offer => {
                if (offer.id === action.payload) {
                    return { ...offer, isCompleted: true };
                }
                return offer
            })}
        case ADD_NEW_OFFER:
            const newOffers = [...state.offers];
            newOffers.splice(1, 0, action.payload); // Вставляем на второе место
            return {
                ...state,
                offers: newOffers
            };
        default: return state
    }
}