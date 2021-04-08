import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

function Menu(props) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="menu">
      <button className="menu__show-button" onClick={() => setShowMenu(true)}>
        <FontAwesomeIcon icon="bars" size="3x" />
      </button>
      <CSSTransition classNames="menu-animation" in={showMenu} timeout={0}>
        <div className="menu__content">
          <div className="menu__content__header">
            <h2>Exchange</h2>
            <button onClick={() => setShowMenu(false)}>
              <FontAwesomeIcon icon="times" size="3x" />
            </button>
          </div>
          <div className="menu__content__links">
            <Link to="/" onClick={() => setShowMenu(false)}>
              Accueil
            </Link>
            {props.userIsConnected ? (
              <Link to="/account" onClick={() => setShowMenu(false)}>
                Mon compte
              </Link>
            ) : (
              <Link to="/connect" onClick={() => setShowMenu(false)}>
                Connexion
              </Link>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
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
    userIsConnected: state.user.isConnected,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
