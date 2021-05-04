import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import Talk from "../components/Talk";
import CustomTextarea from "../components/CustomTextarea";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { animateScroll as scroll } from "react-scroll";

const apiImgUrl = process.env.REACT_APP_REST_API_PUBLIC;
const apiUrl = process.env.REACT_APP_REST_API;
const socketUrl = process.env.REACT_APP_SOCKET;
const socket = io(socketUrl);

class TalkContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      messageTarget: "",
      sendMessage: [],
      showUserWrite: false,
      roomName: null,
    };
  }

  componentDidMount() {
    // Réceptionne quand le recipient saisit un message
    socket.on("user-writes", (msg) => {
      // console.log(msg);
      this.showUserWrite();
    });

    const userToTalkFirstname = this.props.location.pathname.substring(6);
    // Si props recipient vide chercher info sur bdd
    if (this.props.userToTalk === null) {
      axios
        .post(apiUrl + "user/search_by_firstname/" + this.props.userId, {
          firstname: userToTalkFirstname,
        })
        .then((response) => {
          console.log(response);
          const action = {
            type: "SAVE_USER_TO_TALK",
            value: response.data.data.users[0],
          };
          this.props.dispatch(action);
          // On demande un canal privé au serveur
          this.getRoom(response.data.data.users[0].id);
        })
        .catch((error) => {});
    } else {
      // On demande un canal privé au serveur
      this.getRoom(this.props.userToTalk.id);
    }
  }

  getMessage = (message) => {
    console.log(message);
    // Récupére les messages
    let result = this.state.conversation;
    result.push({
      time: message.time,
      user: message.user,
      message: message.message,
    });
    this.setState({
      conversation: result,
    });

    scroll.scrollToBottom();
  };

  handleChange = (e) => {
    let messageTarget = e.target.value;
    // Emet quand l'utilisateur saisit un message
    socket.emit("user-writes", messageTarget, function () {
      // console.log(socket.io.engine.transport.name);
    });

    this.setState({ messageTarget: messageTarget });
  };

  sendMessage = () => {
    if (this.state.messageTarget) {
      const message = {
        user: this.props.firstname,
        userId: this.props.userId,
        message: this.state.messageTarget,
        roomName: this.state.roomName,
      };

      socket.emit("private-message", message, function () {
        // console.log(socket.io.engine.transport.name);
      });

      this.setState({ messageTarget: "" });
    }
  };

  getRoom = (userToTalkId) => {
    if (this.props.userId) {
      const infos = {
        userId: this.props.userId,
        recipientId: userToTalkId,
      };
      console.log(infos);

      socket.emit("get-room", infos, function () {});

      // Room name
      let roomName;
      let smallerId = Math.min(infos.userId, infos.recipientId);
      if (smallerId === infos.userId) {
        roomName = "room-" + infos.userId + "_" + infos.recipientId;
      } else {
        roomName = "room-" + infos.recipientId + "_" + infos.userId;
      }

      this.setState({ roomName: roomName });
      console.log(roomName);
      socket.on(roomName, (msg) => {
        console.log("laaaaa");
        this.getMessage(msg);
      });

      // On récupére la conversation
      this.getConversation(userToTalkId);
    }
  };

  getConversation = (userToTalkId) => {
    axios
      .post(apiUrl + "conversation/get", {
        userOne: this.props.userId,
        userTwo: userToTalkId,
      })
      .then((response) => {
        console.log(response.data.data.result.conversation);
        let messages = response.data.data.result.conversation;

        let result = this.state.conversation;

        messages.forEach((message) => {
          console.log(message.message);
          // result.push({
          //   time: message.time,
          //   user: message.user,
          //   message: message.message,
          // });

          console.log(message);
        });
        // this.setState({
        //   conversation: result,
        // });

        // scroll.scrollToBottom();
      })
      .catch((error) => {});
  };

  // Quand on saisit un message
  showUserWrite = () => {
    this.setState({
      showUserWrite: true,
    });

    setTimeout(() => {
      this.setState({ showUserWrite: false });
    }, 1000);
  };

  render() {
    // Récupére le statut du recipient
    let userToTalkIsConnect = false;

    if (this.props.connectedUsers) {
      this.props.connectedUsers.forEach((element) => {
        if (element.firstname === this.props.userToTalk.firstname) {
          userToTalkIsConnect = true;
        }
      });
    }

    return (
      <div className="talk">
        <div className="talk__content-recipient-infos">
          {this.props.userToTalk ? (
            <div className="talk__content-recipient-infos__content">
              <h3>{userToTalkIsConnect}</h3>
              <div className="talk__content-recipient-infos__content__img">
                <img
                  src={apiImgUrl + this.props.userToTalk.avatarUrl}
                  alt={"Avatar de " + this.props.userToTalk.firstname}
                />
                <div
                  style={{
                    backgroundColor: userToTalkIsConnect
                      ? "rgb(4, 243, 4)"
                      : "rgb(92, 91, 91)",
                  }}
                ></div>
              </div>
              <h3>{this.props.userToTalk.firstname}</h3>
              {this.state.showUserWrite && <p>( est en train d'écrire )</p>}
            </div>
          ) : (
            <FontAwesomeIcon icon="spinner" spin size="2x" />
          )}
        </div>
        <Talk
          conversation={this.state.conversation}
          usertalk={this.props.userToTalk}
          firstname={this.props.firstname}
        />

        <div className="talk__send-container">
          <div className="talk__send-container__input">
            <CustomTextarea
              type="text"
              name="test"
              onChange={this.handleChange}
              placeholder="Ecrivez un message"
              value={this.state.messageTarget}
            />
            <button onClick={this.sendMessage}>
              <FontAwesomeIcon icon="paper-plane" size="2x" />
            </button>
          </div>
        </div>
      </div>
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
    userId: state.user.id,
    firstname: state.user.firstname,
    userToTalk: state.user.userToTalk,
    userAvatarUrl: state.user.avatarUrl,
    connectedUsers: state.user.connectedUsers,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TalkContainer);
