import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import Navigation from "../components/Navigation";

const apiUrl = process.env.REACT_APP_REST_API;
const apiImgUrl = process.env.REACT_APP_REST_API_PUBLIC;
class AutoLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCookie: Cookies.get("id"),
      firstnameCookie: Cookies.get("firstname"),
      emailCookie: Cookies.get("email"),
      startAutoLoginSpinner: false,
    };
  }

  componentDidMount() {
    // Vérifie si des cookies sont existant pour l'utilisateur
    if (Cookies.get("firstname")) {
      this.setState({ startAutoLoginSpinner: true });
      let cookie = {
        id: this.state.idCookie,
        firstname: this.state.firstnameCookie,
        email: this.state.emailCookie,
      };

      // test
      axios
        .get(apiUrl + "get_user/" + cookie.id)
        .then((response) => {
          this.setState({ startSpinner: false });
          // Save user in store
          const action = { type: "LOG_IN", value: response.data.data.user };
          this.props.dispatch(action);
          const action2 = {
            type: "EDIT_AVATAR",
            value: apiImgUrl + response.data.data.user.avatarUrl,
          };
          this.props.dispatch(action2);
          this.setState({ startAutoLoginSpinner: false });
          this.props.history.push("/");
        })
        .catch((error) => {
          // console.log(error);
          this.setState({ startAutoLoginSpinner: false });
        });
    }
  }

  render() {
    return (
      <Navigation startAutoLoginSpinner={this.state.startAutoLoginSpinner} />
    );
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
    // userId: state.user.id,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AutoLoginContainer);
