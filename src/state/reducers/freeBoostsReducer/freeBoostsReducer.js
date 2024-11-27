import { SET_BOOSTS_CHARGERS, SET_DAMAGE_BOOST_ACTIVE, SET_FREE_BOOSTS } from "./types";

const initialState = {
    freeBoosts: [],
    isDamageBoostActive: false
}
export const freeBoostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FREE_BOOSTS:
            return {...state, freeBoosts: action.payload} 
        case SET_DAMAGE_BOOST_ACTIVE:
            return {...state, isDamageBoostActive: action.payload}
        case SET_BOOSTS_CHARGERS:
            return {...state, freeBoosts: state.freeBoosts.map(item => {
                if (item.id === action.payload) {
                    console.log(item);
                    
                    return { ...item, charge: item.charge - 1 }
                }
                return item;
            })
            }
        default: return state
    }
}