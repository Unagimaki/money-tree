import { ADD_REF, SET_REF } from "./types"

export const referralsReducer = (state={}, action) => {
    switch (action.type) {
        case SET_REF:
            return action.payload
        case ADD_REF:
            return { ...state, playerReferralsCount: state.playerReferralsCount + action.payload};
        default: return state
    }
}

