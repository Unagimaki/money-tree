import { INCREMENT_SHOPITEM_LEVEL, SET_SHOP_ITEMS } from "./types"

export const shopReducer = (state = [], action) => {
    switch (action.type) {
        case SET_SHOP_ITEMS:
            return action.payload.map(item => ({
                ...item,
                shopItem: {
                    ...item.shopItem,
                    shopItemLevels: item.shopItem.shopItemLevels.sort((a, b) => a.level - b.level)
                }
            }));
        case INCREMENT_SHOPITEM_LEVEL:
            return state.map(item => {
                if (item.shopItem.id === action.payload) {
                    return {
                        ...item, currentLevel: item.currentLevel + 1
                    }
                } return item
            })
        default: return state
    }
}