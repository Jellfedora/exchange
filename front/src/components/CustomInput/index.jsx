import React from "react";

function CustomInput(props) {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.email}
      onChange={props.onChange}
      autoFocus={props.autofocus}
      autoComplete="true"
    />
  );
}
export default CustomInput;
