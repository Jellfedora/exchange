import React, { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
const apiImgUrl = process.env.REACT_APP_REST_API_PUBLIC;

class Talk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      messageTarget: "",
      sendMessage: [],
      userOneOrTwo: null,
    };
  }

  render() {
    return (
      <div className="talk__content-container">
        {this.props.conversation.map((content, id) => (
          <div className="talk__content-container__content" key={id}>
            {content.user !== this.props.firstname ? (
              <div className="talk__content-container__content__recipient">
                <div className="talk__content-container__content__recipient__time">
                  <span>{content.time}</span>
                </div>
                <div className="talk__content-container__content__recipient__text">
                  <img
                    src={apiImgUrl + this.props.usertalk.avatarUrl}
                    alt={"Avatar de " + content.user}
                  />
                  <p>{content.message}</p>
                </div>
              </div>
            ) : (
              <div
                key={id}
                className="talk__content-container__content__client"
              >
                <div className="talk__content-container__content__client__time">
                  <span>{content.time}</span>
                </div>
                <div className="talk__content-container__content__client__text">
                  <p>{content.message}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
export default Talk;
