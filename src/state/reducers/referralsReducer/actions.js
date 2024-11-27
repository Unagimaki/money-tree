import { ADD_REF, SET_REF } from "./types"

export const actionSetRef = (ref) => {
    return {
        type: SET_REF,
        payload: ref
    }
}

export const actionAddRef = (amount) => {
    return {
        type: ADD_REF,
        payload: amount
    }
}