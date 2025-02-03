const initialState = {
    isVisible: false
}

export const SHOW_ADVERT_MODAL = 'SHOW_ADVERT_MODAL'
export const HIDE_ADVERT_MODAL = 'HIDE_ADVERT_MODAL'

export const actionShowAdvertModal = () => {
    
    return {
        type: SHOW_ADVERT_MODAL
    }
}
export const actionHideAdvertModal = () => {
    return {
        type: HIDE_ADVERT_MODAL
    }
}
 

export const advertModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ADVERT_MODAL:
            return {isVisible: true}
        case HIDE_ADVERT_MODAL:
            return {isVisible: false}
        default: return state
    }
}