const initialState = {
  id: null,
  firstname: null,
  email: null,
  isConnected: false,
};

function userReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "LOG_IN":
      nextState = {
        ...state,
        id: action.value.id,
        firstname: action.value.firstname,
        email: action.value.email,
        isConnected: true,
      };
      return nextState || state;
    case "LOG_OUT":
      nextState = {
        ...state,
        id: null,
        firstname: null,
        email: null,
        isConnected: false,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default userReducer;
