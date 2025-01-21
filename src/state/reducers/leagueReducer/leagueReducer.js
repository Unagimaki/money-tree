const initialState = {
    showCurrentLeague: null,
    leagues: [],
    friends: [],
    currentPage: 1,
}

export const SET_CURRENT_LEAGUE = 'SET_CURRENT_LEAGUE'
export const SET_LEAGUES = 'SET_LEAGUES'
export const SET_FRIENDS = 'SET_FRIENDS'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const UPDATE_LEAGUES = 'UPDATE_LEAGUES'

export const actionSetCurrentPage = (page) => {    
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
}

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
export const actionUpdateLeagues = (data) => {
    return {
        type: UPDATE_LEAGUES,
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
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload}
        case UPDATE_LEAGUES:
            return {...state, leagues: {...state.leagues, topPlayers: [...state.leagues.topPlayers, ...action.payload]}}
        
        default: return state
    }
}