import React from "react";

function CustomInput(props) {
  return (
    <input
      type="text"
      value={props.email}
      onChange={props.onChange}
      autoFocus={props.autofocus}
    />
  );
}
export default CustomInput;
