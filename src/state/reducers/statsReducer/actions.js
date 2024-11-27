import { SET_PLAYER_TOP } from "./types"

export const actionSetPlayersTop = (data) => {
    return{
        type: SET_PLAYER_TOP,
        payload: data
    }
}