import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import io from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET;
const socket = io(socketUrl);

class SocketIdentifierContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    socket.on("connected-user", (connectedUsers) => {
      console.log(connectedUsers);
      const action = {
        type: "SAVE_CONNECTED_USERS",
        value: connectedUsers,
      };
      this.props.dispatch(action);
    });
  }
  componentDidUpdate() {
    const userInfo = {
      userId: this.props.userId,
      firstname: this.props.firstname,
    };
    // console.log(this.props.userId);

    if (this.props.userId) {
      socket.emit("identifier", userInfo, function () {});
      //   console.log(userInfo);
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
    userId: state.user.id,
    firstname: state.user.firstname,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketIdentifierContainer);
