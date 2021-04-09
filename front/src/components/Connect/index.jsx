import CustomInput from "../CustomInput";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Connect(props) {
  return (
    <div className="connect">
      <div className="connect__container">
        <div className="connect__container__title">
          <h3>On est content de te voir à nouveau !</h3>
        </div>

        <form className="connect__container__form">
          <div className="connect__container__form__error-msg">
            {props.showerrorMsg && (
              <h4 className="connect__container__form__error-msg__msg">
                Email ou mot de passe invalide
              </h4>
            )}
          </div>
          <div className="connect__container__form__login">
            <h4>Email</h4>
            <CustomInput
              type="text"
              name="email"
              email={props.email}
              onChange={props.handleEmailChange}
              autofocus={true}
            />
          </div>
          <div className="connect__container__form__password">
            <h4>Mot de passe</h4>
            <CustomInput
              type="password"
              name="password"
              password={props.password}
              onChange={props.handlePasswordChange}
            />
          </div>
          <div className="connect__container__form__forgot-password">
            <a href="#">Mot de passe oublié ?</a>
          </div>
          {!props.startSpinner ? (
            <div className="connect__container__form__submit">
              {props.email && props.password && (
                <button onClick={props.handleSubmit}>Valider</button>
              )}
            </div>
          ) : (
            <div className="connect__container__form__loader">
              <FontAwesomeIcon icon="spinner" spin size="1x" />
            </div>
          )}
        </form>

        {/* <div className="connect__container__register">
          <p>Besoin d'un compte?</p>
          <a href="#">Inscription</a>
        </div> */}
      </div>
    </div>
  );
}
export default Connect;
