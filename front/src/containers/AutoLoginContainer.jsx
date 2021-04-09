import { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";

class AutoLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCookie: Cookies.get("id"),
      firstnameCookie: Cookies.get("firstname"),
      emailCookie: Cookies.get("email"),
    };
  }

  componentDidMount() {
    // Vérifie si des cookies sont existant pour l'utilisateur
    if (this.state.emailCookie && this.state.firstnameCookie) {
      let cookie = {
        id: this.state.idCookie,
        firstname: this.state.firstnameCookie,
        email: this.state.emailCookie,
      };

      const action = { type: "LOG_IN", value: cookie };
      this.props.dispatch(action);
    }
  }

  render() {
    return null;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    // menuIsOpen: state.home.menuIsOpen,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AutoLoginContainer);
