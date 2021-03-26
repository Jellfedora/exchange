import React, { Component } from "react";
import Menu from "../Menu";
import { connect } from "react-redux";
import axios from "axios";
// const apiUrl = process.env.REACT_APP_REST_API;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const config = {
    //   headers: { Authorization: `Bearer ` },
    // };
    axios
      .get("http://localhost:3003/")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h2>Exchange</h2>
          <div className="header__buttons">
            <button className="header__buttons__login">Connexion</button>
            <Menu />
          </div>
        </header>
        <div className="banner">
          <h1>Votre endroit pour échanger</h1>
          <p>
            Que vous fassiez partie d'une famille, d'une entreprise ou
            simplement d'une poignée d'amis, Exchange vous permet de partager
            facilement tous les jours et ce de la maniére la plus sécurisée
            possible.
          </p>
        </div>
        <div className="news">
          <p>
            Disponible dans votre navigateur et bientôt en application mobile
            iOS et android !
          </p>
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
  console.log(state);
  return {
    // menuIsOpen: state.home.menuIsOpen,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
