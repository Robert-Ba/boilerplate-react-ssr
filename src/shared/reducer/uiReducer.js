const initialState = {
  currentInput: '',
};

/**
 * Reducer for any UI state changes.
 * @param {object} state The current UI state
 * @param {object} action The action to perform (type/payload)
 * @returns
 */
const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        currentInput: action.payload,
      };
    case 'CLEAR_INPUT':
      return {
        ...state,
        currentInput: '',
      };
    default:
      return {
        ...state,
      };
  }
};

export default UiReducer;
