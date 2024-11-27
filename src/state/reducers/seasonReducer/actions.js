import { SET_SEASONS } from "./types"

export const actionSetSeason = (seasons) => {    
    return {
        type: SET_SEASONS,
        payload: seasons
    }
}