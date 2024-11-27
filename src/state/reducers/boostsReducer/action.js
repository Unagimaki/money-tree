import { SET_BOOSTS, UPGRADE_BOOST_LEVEL } from "./types"

export const actionSetBoosts = (boosts) => {    
    return {
        type: SET_BOOSTS,
        payload: boosts
    }
}
export const actionUpgradeBoostLevel = (type) => {
    return {
        type: UPGRADE_BOOST_LEVEL,
        payload: type
    }
}