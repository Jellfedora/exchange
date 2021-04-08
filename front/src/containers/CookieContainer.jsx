import { Component } from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";

class CookieContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      idCookie: Cookies.get("id"),
      firstnameCookie: Cookies.get("firstname"),
      emailCookie: Cookies.get("email"),
      showerrorMsg: false,
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

      const action = { type: "SAVE_USER", value: cookie };
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
  return {
    // menuIsOpen: state.home.menuIsOpen,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CookieContainer);
