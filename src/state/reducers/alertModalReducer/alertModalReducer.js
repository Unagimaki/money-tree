const initialState = {
    text: null,
    title: null,
    isVisible: false
}

export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

export const actionShowModal = (title, text = '') => {
    console.log(text, title);
    
    return {
        type: SHOW_MODAL,
        payload: {
            text, title
        }
    }
}
export const actionHideModal = () => {
    return {
        type: HIDE_MODAL,
    }
}
 

export const alertModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {text: action.payload.text, title: action.payload.title, isVisible: true}
        case HIDE_MODAL:
            return {text: null, title: null, isVisible: false}
        default: return state
    }
}