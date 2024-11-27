import { SET_PLAYER_TOP } from "./types"

export const statsReducer = (state = {}, action) => {   
    switch (action.type) {
        case SET_PLAYER_TOP:
            return action.payload    
        default: return state
    }
}