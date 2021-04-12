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
      searchResult: [],
    };
  }

  componentDidMount() {}

  handleSearchUsersChange = (e) => {
    let searchTarget = e.target.value;
    this.setState({ search: searchTarget });
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

          this.setState({
            searchResult: result,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ searchResult: [] });
    }
  };

  talkToUser = (e) => {
    console.log(e);
  };

  render() {
    return (
      <SearchUsers // FIRSTNAME
        search={this.state.search}
        handleSearchUsersChange={this.handleSearchUsersChange}
        searchResult={this.state.searchResult}
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchUsersContainer);
