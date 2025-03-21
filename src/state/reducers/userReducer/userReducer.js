import {  INCREASE_USER_BALANCE, INCREASE_USER_ENERGY, REDUCE_USER_ENERGY, SET_USER, SET_USER_BALANCE, SET_USER_DAMAGE, SET_USER_ENERGY, SET_USER_MAX_ENERGY, SET_USER_REFRESH_TOKEN, SET_USER_REGENERATION, SET_USER_TICKETS, SET_USER_TOKEN } from "./types"

export const userReducer = (state = {}, action) => {   
    switch (action.type) {
        case SET_USER: 
            return {...state, player: action.payload}
        case SET_USER_TOKEN:
            return {...state, token: action.payload}
        case SET_USER_REFRESH_TOKEN:
            return {...state, refreshToken: action.payload}
        case INCREASE_USER_BALANCE:
            return { ...state, player: { ...state.player, balance: state.player.balance + action.payload }}
        case INCREASE_USER_ENERGY:
            return { ...state, player: { ...state.player, energy: state.player.energy + action.payload } }
        case REDUCE_USER_ENERGY:
            return { ...state, player: { ...state.player, energy: state.player.energy - action.payload } }
        case SET_USER_BALANCE:
            return {...state, player: {...state.player, balance: action.payload}}
        case SET_USER_DAMAGE:
            return {...state, player: {...state.player, damage: action.payload}}
        case SET_USER_ENERGY:
            return {...state, player: {...state.player, energy: action.payload}}
        case SET_USER_MAX_ENERGY:
            return {...state, player: {...state.player, maxEnergy: action.payload}}
        case SET_USER_REGENERATION:
            return {...state, player: {...state.player, regeneration: action.payload}}
        case SET_USER_TICKETS:
            return {...state, player: {...state.player, tickets: action.payload}}
        default: return state
    } 
}



