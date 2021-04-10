import CustomInput from "../CustomInput";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  console.log(inputs[2].input);
  return (
    <div className="account">
      <h3>Mon compte</h3>
      <div className="account__container">
        <form className="account__container__form">
          {/* TEST */}
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

          {/* FIRSTNAME */}
          {/* <div className="account__container__form__firstname">
            <h4>Modifier votre prénom</h4>
            <div className="account__container__form__firstname__content">
              <CustomInput
                type="text"
                name="firstname"
                defaultValue={props.firstname}
                firstname={props.firstname}
                onChange={props.handleFirstnameChange}
                autoComplete="false"
              />

              {!props.startFirstnameSpinner ? (
                <div className="account__container__form__firstname__content__submit">
                  <button onClick={props.handleFirstnameSubmit}>
                    <FontAwesomeIcon icon="check-circle" size="2x" />
                  </button>
                </div>
              ) : (
                <div className="account__container__form__firstname__content__submit">
                  <FontAwesomeIcon icon="spinner" spin size="2x" />
                </div>
              )}
            </div>
          </div> */}
          {/* EMAIL */}
          {/* <div className="account__container__form__email">
            <h4>Modifier votre email</h4>
            <div className="account__container__form__email__content">
              <CustomInput
                type="text"
                name="email"
                defaultValue={props.email}
                email={props.email}
                onChange={props.handleEmailChange}
                autoComplete="false"
              />

              {!props.startEmailSpinner ? (
                <div className="account__container__form__email__content__submit">
                  <button onClick={props.handleEmailSubmit}>
                    <FontAwesomeIcon icon="check-circle" size="2x" />
                  </button>
                </div>
              ) : (
                <div className="account__container__form__email__content__submit">
                  <FontAwesomeIcon icon="spinner" spin size="2x" />
                </div>
              )}
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};
export default Account;
