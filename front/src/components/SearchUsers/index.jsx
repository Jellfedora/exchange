import React from "react";
import { connect } from "react-redux";
import CustomInput from "../CustomInput";
const apiImgUrl = process.env.REACT_APP_REST_API_PUBLIC;

const SearchUsers = (props) => {
  console.log(props.searchUsersResult);
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
              <img src={apiImgUrl + content.avatarUrl} alt="" />
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
    // userIsConnected: state.user.isConnected,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);