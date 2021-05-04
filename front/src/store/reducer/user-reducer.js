const initialState = {
  id: null,
  firstname: null,
  email: null,
  avatarUrl: null,
  isConnected: false,
  startEditAvatarSpinner: false,
  searchUsersTarget: "",
  searchUsersResult: [],
  userToTalk: null,
  conversation: [],
  connectedUsers: [],
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
      // Add user status online
      // console.log(action.value);
      // console.log(state.connectedUsers);
      let users = [];

      action.value.forEach((test) => {
        let user = {
          id: test.id,
          firstname: test.firstname,
          avatarUrl: test.avatarUrl,
          isConnected: false,
        };
        users.push(user);

        state.connectedUsers.forEach((element) => {
          // console.log(element);
          if (element.firstname === test.firstname) {
            // let user = {
            //   id: test.id,
            //   firstname: test.firstname,
            //   avatarUrl: test.avatarUrl,
            //   isConnected: true,
            // };
            // users.push(user);
            const resultat = users.findIndex(
              (test) => test.firstname === element.firstname
            );
            // let tru = users.find(test.firstname);
            // console.log(resultat);
            users[resultat].isConnected = true;
          }
        });
      });
      console.log(users);
      nextState = {
        ...state,
        searchUsersResult: users,
      };
      return nextState || state;
    case "SAVE_USER_TO_TALK":
      nextState = {
        ...state,
        userToTalk: action.value,
      };
      return nextState || state;

    case "SAVE_CURRENT_CONVERSATION":
      nextState = {
        ...state,
        conversation: action.value,
      };
      return nextState || state;
    case "SAVE_CONNECTED_USERS":
      let connectedUsersToSave = [];

      Object.keys(action.value).forEach(function (key) {
        connectedUsersToSave.push(key, action.value[key]);
      });

      nextState = {
        ...state,
        connectedUsers: connectedUsersToSave[1],
      };
      return nextState || state;

    default:
      return state;
  }
}

export default userReducer;
