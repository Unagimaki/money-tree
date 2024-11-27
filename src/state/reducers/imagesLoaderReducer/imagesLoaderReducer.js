export const SET_IMAGES_LOADED  ='SET_IMAGES_LOADED'

export const actionSetImagesLoaded = (boolean) => {
    return {
        type: SET_IMAGES_LOADED,
        payload: boolean
    }
}

export const imagesLoaderReducer = (state = false, action) => {
    switch (action.type) {
        case SET_IMAGES_LOADED:
            return action.payload
        default: return state
    }
}