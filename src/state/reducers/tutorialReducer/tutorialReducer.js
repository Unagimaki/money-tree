const initialState = {
  isTutorialIsActive: false, 
  currentStep: 0,
  isHintVisible: {
    toGameButton: false,
    toMainButton: false
  }
}

export const INCREASE_STEP = "INCREASE_STEP";
export const SET_TUTORIAL_ACTIVE = "SET_TUTORIAL_ACTIVE";
export const SET_HINT_BUTTON_VISIBLE = "SET_HINT_BUTTON_VISIBLE";
export const SET_STEP = 'SET_STEP'

export const actionSetStep = (step) => {
  return {
    type: SET_STEP,
    payload: step
  }
}

export const actionIncreaseStep = () => {
  return {
    type: INCREASE_STEP
  }
}
export const actionSetTutorialActive = (boolean) => {
  return {
    type: SET_TUTORIAL_ACTIVE,
    payload: boolean
  }
}
  export const actionHintButtonVisible = (toGameButton, toMainButton) => ({
    type: SET_HINT_BUTTON_VISIBLE,
    payload: { toGameButton, toMainButton }
  });

export const tutorialReducer = (state = initialState, action) => {  
    switch (action.type) {
      case INCREASE_STEP:
        return {...state, currentStep: state.currentStep + 1}
      case SET_TUTORIAL_ACTIVE:
        return {...state, isTutorialIsActive: action.payload}
      case SET_HINT_BUTTON_VISIBLE:
        return {
        ...state,
        isHintVisible: {
          ...state.isHintVisible, // Сохраняем текущее состояние
          ...action.payload // Обновляем поля из action.payload
        }
      };
      case SET_STEP:
        return {...state, currentStep: action.payload}
      default:
        return state;
    }
}