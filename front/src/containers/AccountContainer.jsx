import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import Account from "../components/Account";

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      startFirstnameSpinner: false,
      email: "",
      startEmailSpinner: false,
      password: "******",
      startPasswordSpinner: false,
      //   showerrorMsg: false,
    };
  }

  componentDidMount() {
    this.setState({
      firstname: this.props.userFirstname,
      email: this.props.userEmail,
      // password: this.props.userEmail,
    });
  }

  componentDidUpdate() {
    // If not connected, redirect to connect page
    if (!this.props.userIsConnected) {
      this.props.history.push("/connect");
    }
  }

  // FIRSTNAME
  handleFirstnameChange = (e) => {
    let firstnameTarget = e.target.value;
    this.setState({ firstname: firstnameTarget });
  };

  handleFirstnameSubmit = (event) => {
    console.log(this.state.firstname);
    event.preventDefault();
    this.setState({ startFirstnameSpinner: true });
    axios
      .put("https://127.0.0.1:8000/api/" + "user/edit/" + this.props.userId, {
        firstname: this.state.firstname,
      })
      .then((response) => {
        console.log(response.data.data.user);
        this.setState({ startFirstnameSpinner: false });
        // Update Cookie
        Cookies.set("firstname", response.data.data.user.firstname, {
          expires: 301,
        });
        // Upate store
        const action = {
          type: "EDIT_USER",
          value: response.data.data.user,
        };
        this.props.dispatch(action);
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ startFirstnameSpinner: false });
      });
  };

  // EMAIL
  handleEmailChange = (e) => {
    let emailTarget = e.target.value;
    this.setState({ email: emailTarget });
  };

  handleEmailSubmit = (event) => {
    console.log(this.state.email);
    event.preventDefault();
    this.setState({ startEmailSpinner: true });
    axios
      .put("https://127.0.0.1:8000/api/" + "user/edit/" + this.props.userId, {
        email: this.state.email,
      })
      .then((response) => {
        console.log(response.data.data.user);
        this.setState({ startEmailSpinner: false });
        // Update Cookie
        Cookies.set("email", response.data.data.user.email, {
          expires: 30,
        });
        // Upate store
        const action = {
          type: "EDIT_USER",
          value: response.data.data.user,
        };
        this.props.dispatch(action);
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ startEmailSpinner: false });
      });
  };

  // PASSWORD
  handlePasswordChange = (e) => {
    let passwordTarget = e.target.value;
    this.setState({ password: passwordTarget });
  };

  handlePasswordSubmit = (event) => {
    console.log(this.state.password);
    event.preventDefault();
    this.setState({ startPasswordSpinner: true });
    axios
      .put("https://127.0.0.1:8000/api/" + "user/edit/" + this.props.userId, {
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data.data.user);
        this.setState({ startPasswordSpinner: false });
        // Upate store
        const action = {
          type: "EDIT_USER",
          value: response.data.data.user,
        };
        this.props.dispatch(action);
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ startPasswordSpinner: false });
      });
  };

  render() {
    return (
      <Account
        // FIRSTNAME
        firstname={this.state.firstname}
        handleFirstnameChange={this.handleFirstnameChange}
        handleFirstnameSubmit={this.handleFirstnameSubmit}
        startFirstnameSpinner={this.state.startFirstnameSpinner}
        // EMAIL
        email={this.state.email}
        handleEmailChange={this.handleEmailChange}
        handleEmailSubmit={this.handleEmailSubmit}
        startEmailSpinner={this.state.startEmailSpinner}
        // PASSWORD
        password={this.state.password}
        handlePasswordChange={this.handlePasswordChange}
        handlePasswordSubmit={this.handlePasswordSubmit}
        startPasswordSpinner={this.state.startPasswordSpinner}
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
  // console.log(state);
  return {
    userIsConnected: state.user.isConnected,
    userEmail: state.user.email,
    userFirstname: state.user.firstname,
    userId: state.user.id,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
