import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import Account from "../components/Account";

const apiUrl = process.env.REACT_APP_REST_API;
const apiImgUrl = process.env.REACT_APP_REST_API_PUBLIC;

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      startFirstnameSpinner: false,
      email: null,
      startEmailSpinner: false,
      password: "******",
      startPasswordSpinner: false,
      selectedAvatar: "",
      avatarUrl: null,
      startAvatarSpinner: false,
      //   showerrorMsg: false,
    };
  }

  componentDidMount() {
    this.setState({
      firstname: this.props.userFirstname,
      email: this.props.userEmail,
      avatarUrl: this.props.avatarUrl,
    });
  }

  componentDidUpdate() {
    // mettre à jour le state
    if (this.state.avatarUrl === null) {
      this.setState({ avatarUrl: this.props.avatarUrl });
    }
    if (this.state.firstname === null) {
      this.setState({ firstname: this.props.userFirstname });
    }
    if (this.state.email === null) {
      this.setState({ email: this.props.userEmail });
    }

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
    event.preventDefault();
    this.setState({ startFirstnameSpinner: true });
    axios
      .put(apiUrl + "user/edit/" + this.props.userId, {
        firstname: this.state.firstname,
      })
      .then((response) => {
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
    event.preventDefault();
    this.setState({ startEmailSpinner: true });
    axios
      .put(apiUrl + "user/edit/" + this.props.userId, {
        email: this.state.email,
      })
      .then((response) => {
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
    event.preventDefault();
    this.setState({ startPasswordSpinner: true });
    axios
      .put(apiUrl + "user/edit/" + this.props.userId, {
        password: this.state.password,
      })
      .then((response) => {
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

  goAvatarSpinner = () => {
    this.setState({ startAvatarSpinner: true });
    const action = {
      type: "EDIT_AVATAR__SPINNER",
    };
    this.props.dispatch(action);
  };

  // AVATAR
  submitEditAvatar = (e) => {
    // console.log(e);

    const formData = new FormData();
    formData.append("file", e);

    axios
      .post(apiUrl + "user/avatar-edit/" + this.props.userId, formData)
      .then((response) => {
        const action = {
          type: "EDIT_AVATAR",
          value: apiImgUrl + response.data.data.avatarUrl,
        };
        this.props.dispatch(action);
        const action2 = {
          type: "EDIT_AVATAR__SPINNER",
        };
        this.props.dispatch(action2);
        this.setState({
          avatarUrl: apiImgUrl + response.data.data.avatarUrl,
          startAvatarSpinner: false,
        });
      })
      .catch((error) => {
        this.setState({ startAvatarSpinner: false });
        const action = {
          type: "EDIT_AVATAR__SPINNER",
        };
        this.props.dispatch(action);
        // console.log(error);
      });
  };

  // DELETE ACCOUNT
  deleteAccount = (event) => {
    event.preventDefault();

    axios
      .delete(apiUrl + "user/delete/" + this.props.userId)
      .then((response) => {
        // console.log(response);
        // Delete cookies
        Cookies.remove("id");
        Cookies.remove("firstname");
        Cookies.remove("email");
        // Delete store
        const action = {
          type: "DELETE_USER",
        };
        this.props.dispatch(action);
        // Go to home
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Account
        // AVATAR
        userAvatarUrl={this.state.avatarUrl}
        submitEditAvatar={this.submitEditAvatar}
        startAvatarSpinner={this.state.startAvatarSpinner}
        goAvatarSpinner={this.goAvatarSpinner}
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
        // DELETE ACCOUNT
        deleteAccount={this.deleteAccount}
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
    avatarUrl: state.user.avatarUrl,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
