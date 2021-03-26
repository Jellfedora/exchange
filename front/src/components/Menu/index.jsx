import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Menu() {
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
            <span>Accueil</span>
            <span>Connexion</span>
            <span>A propos</span>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
export default Menu;
