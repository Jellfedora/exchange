import React, { Component } from "react";
import { connect } from "react-redux";
// import axios from "axios";
import { motion } from "framer-motion";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const config = {
    //   headers: { Authorization: `Bearer ` },
    // };
    // axios
    //   .get("http://localhost:3003/")
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  render() {
    return (
      <motion.div
        className="home"
        // animate={{ scale: 0.9 }}
        // transition={{ duration: 1 }}
        // exit={{ opacity: 0.5 }}
      >
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
      </motion.div>
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
    // menuIsOpen: state.home.menuIsOpen,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
