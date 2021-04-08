import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import Connect from "../components/Connect";

class ConnectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      idCookie: Cookies.get("id"),
      firstnameCookie: Cookies.get("firstname"),
      emailCookie: Cookies.get("email"),
      showerrorMsg: false,
      startSpinner: false,
    };
  }

  componentDidMount() {
    // Si déjà connecté redirige vers la home
    if (this.props.userIsConnected) {
      this.props.history.push("/");
    }
  }

  handleEmailChange = (e) => {
    let emailTarget = e.target.value;
    this.setState({ email: emailTarget });
  };

  handlePasswordChange = (e) => {
    let passwordTarget = e.target.value;
    this.setState({ password: passwordTarget });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ startSpinner: true });
    axios
      .post("https://127.0.0.1:8000/api/" + "login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data.data);
        // Save Cookie
        Cookies.set("id", response.data.data.user[0].id, { expires: 30 });
        Cookies.set("firstname", response.data.data.user[0].firstname, {
          expires: 30,
        });
        Cookies.set("email", response.data.data.user[0].email, { expires: 30 });
        // Save user in store
        const action = { type: "SAVE_USER", value: response.data.data.user[0] };
        this.props.dispatch(action);
        this.setState({ startSpinner: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showerrorMsg: true, startSpinner: false });
      });
  };

  render() {
    return (
      <Connect
        email={this.state.email}
        password={this.state.password}
        showerrorMsg={this.state.showerrorMsg}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        handleSubmit={this.handleSubmit}
        startSpinner={this.state.startSpinner}
      />
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
    userIsConnected: state.user.isConnected,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConnectContainer);
