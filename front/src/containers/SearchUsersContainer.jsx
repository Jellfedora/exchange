import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import SearchUsers from "../components/SearchUsers";

const apiUrl = process.env.REACT_APP_REST_API;
const apiImgUrl = process.env.REACT_APP_REST_API_PUBLIC;
class SearchUsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      // searchResult: [],
    };
  }

  componentDidMount() {
    console.log(this.props.searchUsersResult);
  }

  handleSearchUsersChange = (e) => {
    let searchTarget = e.target.value;
    const action = { type: "SEARCH_USERS_TARGET", value: searchTarget };
    this.props.dispatch(action);
    if (searchTarget) {
      axios
        .post(apiUrl + "user/search_by_firstname/" + this.props.userId, {
          firstname: searchTarget,
        })
        .then((response) => {
          let arrayResponse = Object.entries(response.data.data.users);
          let result = [];

          arrayResponse.forEach((element) => {
            result.push(element[1]);
          });

          const action = { type: "SAVE_SEARCH_USERS", value: result };
          this.props.dispatch(action);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const action = { type: "SAVE_SEARCH_USERS", value: [] };
      this.props.dispatch(action);
      // this.setState({ searchResult: [] });
    }
  };

  talkToUser = (e) => {
    let firstname = e.toLowerCase();
    this.props.history.push("/talk/" + firstname);
  };

  render() {
    return (
      <SearchUsers
        searchUsersTarget={this.props.searchUsersTarget}
        handleSearchUsersChange={this.handleSearchUsersChange}
        searchUsersResult={this.props.searchUsersResult}
        talkToUser={this.talkToUser}
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
    userId: state.user.id,
    searchUsersResult: state.user.searchUsersResult,
    searchUsersTarget: state.user.searchUsersTarget,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsersContainer);
