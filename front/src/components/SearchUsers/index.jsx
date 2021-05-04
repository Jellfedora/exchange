import React from "react";
import { connect } from "react-redux";
import CustomInput from "../CustomInput";
const apiImgUrl = process.env.REACT_APP_REST_API_PUBLIC;

const SearchUsers = (props) => {
  // console.log(props.searchUsersResult);

  // Récupére le statut du recipient
  // let userToTalkIsConnect = false;

  // props.connectedUsers.forEach((element) => {
  //   if (element.firstname === this.props.userToTalk.firstname) {
  //     userToTalkIsConnect = true;
  //   }
  // });
  return (
    <div className="search-users">
      <CustomInput
        type="text"
        name="search"
        onChange={props.handleSearchUsersChange}
        placeholder="Rechercher un utilisateur"
        defaultValue={props.searchUsersTarget}
      />
      <div className="search-users__results">
        <div>
          {props.searchUsersResult.map((content, id) => (
            <button
              key={content.id}
              className="search-users__results__result"
              onClick={() => props.talkToUser(content.firstname)}
            >
              <div className="search-users__results__result__img">
                <img src={apiImgUrl + content.avatarUrl} alt="" />
                <div
                  style={{
                    backgroundColor: content.isConnected
                      ? "rgb(4, 243, 4)"
                      : "rgb(92, 91, 91)",
                  }}
                ></div>
              </div>
              <div className="search-users__results__result__title">
                <h3>{content.firstname}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};
const mapStateToProps = (state) => {
  return {
    connectedUsers: state.user.connectedUsers,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);
