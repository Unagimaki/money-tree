const initialState = {
    showCurrentLeague: 1,
    leagues: []
}

export const SET_CURRENT_LEAGUE = 'SET_CURRENT_LEAGUE'
export const SET_LEAGUES = 'SET_LEAGUES'

export const actionSetCurrentLeague = (num) => {    
    return {
        type: SET_CURRENT_LEAGUE,
        payload: num
    }
}
export const actionSetLeagues = (data) => {
    return {
        type: SET_LEAGUES,
        payload: data
    }
}

export const leagueReducer = (state = initialState, action) => {   
    switch (action.type) {
        case SET_CURRENT_LEAGUE:
            return {...state, showCurrentLeague: action.payload}
        case SET_LEAGUES:
            return {...state, leagues: action.payload}
        default: return state
    }
}