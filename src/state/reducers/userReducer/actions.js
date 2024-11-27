import { CAN_USER_PLAY, INCREASE_USER_BALANCE, INCREASE_USER_ENERGY, REDUCE_USER_ENERGY, SET_USER, SET_USER_BALANCE, SET_USER_DAMAGE, SET_USER_ENERGY, SET_USER_MAX_ENERGY, SET_USER_REFRESH_TOKEN, SET_USER_REGENERATION, SET_USER_TOKEN } from "./types"

export const actionSetUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  }
} 
export const actionSetUserToken = (token) => {
  return {
    type: SET_USER_TOKEN,
    payload: token
  }
} 

export const actionIncreaseUserBalance = (balance) => {
  return {
    type: INCREASE_USER_BALANCE,
    payload: balance
  }
}
export const actionIncreaseUserEnergy = (amount) => {
  return {
    type: INCREASE_USER_ENERGY,
    payload: amount
  }
}
export const actionSetUserRefreshToken = (token) => {  
  return {
    type: SET_USER_REFRESH_TOKEN,
    payload: token
  }
}
export const actionReduceUserEnergy = (amount) => {
  return {
    type: REDUCE_USER_ENERGY,
    payload: amount
  }
}
export const actionSetUserBalance = (balance) => {
  return {
    type: SET_USER_BALANCE,
    payload: balance
  }
}

export const actionSetUserDamage = (damage) => {
  return {
    type: SET_USER_DAMAGE,
    payload: damage
  }
}

export const actionSetUserEnergy = (energy) => {
  return {
    type: SET_USER_ENERGY,
    payload: energy
  }
}

export const actionSetUserMaxEnergy = (maxEnergy) => {
  return {
    type: SET_USER_MAX_ENERGY,
    payload: maxEnergy
  }
}

export const actionSetUserRegeneration = (regeneration) => {
  return {
    type: SET_USER_REGENERATION,
    payload: regeneration
  }
}
export const actionSetCanUserPlay = (boolean) => {
  return {
    type: CAN_USER_PLAY,
    payload: boolean
  }
}