import React from "react";
// Import Redux Store
import { Provider } from "react-redux";
import store from "../../store";
// Import Sass
import "../../styles/index.scss";
// Import Components
import Navigation from "../Navigation";
import AutoLoginContainer from "../../containers/AutoLoginContainer";

// Fontawesome 5
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faTimes,
  faSpinner,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons"; //For brand icons
library.add(faReact, faBars, faTimes, faSpinner, faEdit);

const App = () => {
  return (
    <Provider store={store} className="app">
      <AutoLoginContainer />
      <Navigation />
    </Provider>
  );
};
export default App;
