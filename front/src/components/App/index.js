import React from "react";
// Import Redux Store
import { Provider } from "react-redux";
import store from "../../store";
// Import Sass
import "../../styles/index.scss";
// Import Components
import AutoLoginContainer from "../../containers/AutoLoginContainer";

// Fontawesome 5
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faTimes,
  faSpinner,
  faEdit,
  faCamera,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons"; //For brand icons
library.add(faReact, faBars, faTimes, faSpinner, faEdit, faCamera, faSignInAlt);

const App = () => {
  return (
    <Provider store={store} className="app">
      <AutoLoginContainer />
    </Provider>
  );
};
export default App;
