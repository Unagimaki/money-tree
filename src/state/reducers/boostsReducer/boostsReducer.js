import { SET_BOOSTS, UPGRADE_BOOST_LEVEL } from "./types";

const initialState = {
    boosts: []
}

export const boostsReducer = (state = initialState, action) => {       
    switch (action.type) {
        case SET_BOOSTS:
            const sortedBoosts = action.payload.map(boost => ({
                ...boost,
                boost: {
                    ...boost.boost,
                    levels: boost.boost.levels.sort((a, b) => a.level - b.level)
                }
            }));
            return { ...state, boosts: sortedBoosts };
        case UPGRADE_BOOST_LEVEL:
            return { ...state, boosts: state.boosts.map((item) => {
                if (item.boost.type === action.payload) {
                  return { ...item, currentLevel: item.currentLevel + 1 };
                }
                return item;
              }),
            }
        default: return state
    }
}