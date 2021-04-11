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
      showerrorMsg: false,
      startSpinner: false,
    };
  }

  componentDidUpdate() {
    // If connected, redirect to home
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
        this.setState({ startSpinner: false });
        // Save Cookie
        Cookies.set("id", response.data.data.user.id, { expires: 30 });
        Cookies.set("firstname", response.data.data.user.firstname, {
          expires: 30,
        });
        Cookies.set("email", response.data.data.user.email, { expires: 30 });
        Cookies.set("avatarUrl", response.data.data.user.avatarUrl, {
          expires: 30,
        });
        // Save user in store
        const action = { type: "LOG_IN", value: response.data.data.user };
        this.props.dispatch(action);
        this.props.history.push("/");
      })
      .catch((error) => {
        // console.log(error);
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
