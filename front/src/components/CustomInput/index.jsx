import React from "react";

function CustomInput(props) {
  return (
    <input
      type={props.type}
      name={props.name}
      defaultValue={props.defaultValue ? props.defaultValue : ""}
      onChange={props.onChange}
      autoFocus={props.autofocus}
      autoComplete={props.autoComplete ? "true" : "false"}
    />
  );
}
export default CustomInput;
