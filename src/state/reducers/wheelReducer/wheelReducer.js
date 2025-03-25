const initialState = {
    prizes: []
};

const SET_PRIZES = 'SET_PRIZES';

export const actionSetPrizes = (arr) => {
    return {
        type: SET_PRIZES,
        payload: arr
    }
}

export const wheelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRIZES:
            return {
                ...state, // создаем новый объект, чтобы не мутировать state
                prizes: action.payload // обновляем prizes
            };

        default:
            return state;
    }
};
