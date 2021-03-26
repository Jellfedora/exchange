const initialState = {
  // Example action
  menuIsOpen: false,
};

function homeReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    // Example reducer
    case "TOGGLE_MENU":
      console.log(action.value);
      nextState = {
        ...state,
        menuIsOpen: action.value,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default homeReducer;
