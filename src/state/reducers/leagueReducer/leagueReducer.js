const initialState = {
    showCurrentLeague: 'bronze',
    leagues: [],
    friends: []
}

export const SET_CURRENT_LEAGUE = 'SET_CURRENT_LEAGUE'
export const SET_LEAGUES = 'SET_LEAGUES'
export const SET_FRIENDS = 'SET_FRIENDS'

export const actionSetCurrentLeague = (league) => {       
    return {
        type: SET_CURRENT_LEAGUE,
        payload: league
    }
}
export const actionSetLeagues = (data) => {
    return {
        type: SET_LEAGUES,
        payload: data
    }
}
export const actionSetFriends = (data) => {
    return {
        type: SET_FRIENDS,
        payload: data
    }   
}

export const leagueReducer = (state = initialState, action) => {   
    switch (action.type) {
        case SET_CURRENT_LEAGUE:
            return {...state, showCurrentLeague: action.payload}
        case SET_LEAGUES:
            return {...state, leagues: action.payload}
        case SET_FRIENDS:
            return {...state, friends: action.payload}
        default: return state
    }
}