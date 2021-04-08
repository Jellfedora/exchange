const initialState = {
  id: null,
  firstname: null,
  email: null,
  isConnected: false,
};

function homeReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "SAVE_USER":
      console.log(action.value);
      nextState = {
        ...state,
        id: action.value.id,
        firstname: action.value.firstname,
        email: action.value.email,
        isConnected: true,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default homeReducer;
