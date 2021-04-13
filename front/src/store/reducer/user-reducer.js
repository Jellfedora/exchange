const initialState = {
  id: null,
  firstname: null,
  email: null,
  avatarUrl: null,
  isConnected: false,
  startEditAvatarSpinner: false,
  searchUsersTarget: "",
  searchUsersResult: [],
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
        // avatarUrl: action.value.avatarUrl,
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
    case "EDIT_USER":
      nextState = {
        ...state,
        id: action.value.id,
        firstname: action.value.firstname,
        email: action.value.email,
      };
      return nextState || state;
    case "EDIT_AVATAR":
      nextState = {
        ...state,
        avatarUrl: action.value,
      };
      return nextState || state;
    case "EDIT_AVATAR__SPINNER":
      nextState = {
        ...state,
        startEditAvatarSpinner: !state.startEditAvatarSpinner,
      };
      return nextState || state;
    case "DELETE_USER":
      nextState = {
        ...state,
        id: null,
        firstname: null,
        email: null,
        avatarUrl: null,
        isConnected: false,
      };
      return nextState || state;
    case "SEARCH_USERS_TARGET":
      nextState = {
        ...state,
        searchUsersTarget: action.value,
      };
      return nextState || state;
    case "SAVE_SEARCH_USERS":
      nextState = {
        ...state,
        searchUsersResult: action.value,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default userReducer;
