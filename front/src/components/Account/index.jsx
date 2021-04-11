import CustomInput from "../CustomInput";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomFileInput from "../CustomFileInput";

const Account = (props) => {
  const inputs = [
    {
      name: "prénom",
      type: "text",
      input: props.firstname,
      handleChange: props.handleFirstnameChange,
      handleSubmit: props.handleFirstnameSubmit,
      startSpinner: props.startFirstnameSpinner,
    },
    {
      name: "email",
      type: "text",
      input: props.email,
      handleChange: props.handleEmailChange,
      handleSubmit: props.handleEmailSubmit,
      startSpinner: props.startEmailSpinner,
    },
    {
      name: "mot de passe",
      type: "password",
      input: props.password,
      handleChange: props.handlePasswordChange,
      handleSubmit: props.handlePasswordSubmit,
      startSpinner: props.startPasswordSpinner,
    },
  ];
  return (
    <div className="account">
      <h3>Mon compte</h3>
      <div className="account__container">
        <form className="account__container__form">
          <div className="account__container__form__avatar">
            <div className="account__container__form__avatar__img-container">
              {!props.startAvatarSpinner ? (
                <img
                  // TODO
                  src={props.userAvatarUrl}
                  alt="Votre avatar"
                />
              ) : (
                <div className="account__container__form__avatar__img-container__spinner">
                  <FontAwesomeIcon icon="spinner" spin size="4x" />
                </div>
              )}
            </div>
            <CustomFileInput
              selectedAvatar={props.selectedAvatar}
              submitEditAvatar={props.submitEditAvatar}
            />
          </div>
          {inputs.map((content, id) => (
            <div className="account__container__form__field" key={id}>
              <h4>Modifier votre {content.name}</h4>
              <div className="account__container__form__field__content">
                <CustomInput
                  type={content.type}
                  name={content.name}
                  defaultValue={content.input}
                  onChange={content.handleChange}
                />
                {!content.startSpinner ? (
                  <div className="account__container__form__field__content__submit">
                    <button onClick={content.handleSubmit}>
                      <FontAwesomeIcon icon="edit" size="2x" />
                    </button>
                  </div>
                ) : (
                  <div className="account__container__form__field__content__submit">
                    <FontAwesomeIcon icon="spinner" spin size="2x" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};
export default Account;
