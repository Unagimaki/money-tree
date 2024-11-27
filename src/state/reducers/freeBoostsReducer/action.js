import { SET_BOOSTS_CHARGERS, SET_DAMAGE_BOOST_ACTIVE, SET_FREE_BOOSTS } from "./types"

export const actionSetFreeBoosts = (boosts) => {    
    return {
        type: SET_FREE_BOOSTS,
        payload: boosts
    }
}
export const actionSetDamageBoostActive = (boolean) => {
    return {
        type: SET_DAMAGE_BOOST_ACTIVE,
        payload: boolean
    }
}
export const actionSetBoostsChargers = (id) => {
    console.log(id);
    
    return {
        type: SET_BOOSTS_CHARGERS,
        payload: id
    }
}