const initialState = {
    items: [
        // {
        //     id: 123,
        //     price: 10000,
        //     tickets: 10
        // },
        // {
        //     id: 456,
        //     price: 15000,
        //     tickets: 5
        // },
        // {
        //     id: 789,
        //     price: 8000,
        //     tickets: 12
        // },
        // {
        //     id: 321,
        //     price: 12000,
        //     tickets: 7
        // },
        // {
        //     id: 654,
        //     price: 5000,
        //     tickets: 20
        // }
    ]
}


export const SET_TICKET_ITEMS = 'SET_TICKET_ITEMS'

export const actionSetTicketItems = (arr) => {
    return {
        type: SET_TICKET_ITEMS,
        payload: arr
    }
}

export const ticketShopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}
