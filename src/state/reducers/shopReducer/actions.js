import { INCREMENT_SHOPITEM_LEVEL, SET_SHOP_ITEMS } from "./types"

export const actionSetShopItems = (items) => {    
    return {
        type: SET_SHOP_ITEMS,
        payload: items
    }
}
export const actionIncrementShopItemLevel = (id) => {
    return {
        type: INCREMENT_SHOPITEM_LEVEL,
        payload: id
    }
} 