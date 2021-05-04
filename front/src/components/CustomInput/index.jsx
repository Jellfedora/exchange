import React from "react";

function CustomInput(props) {
  return (
    <div>
      <input
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue ? props.defaultValue : ""}
        onChange={props.onChange}
        autoFocus={props.autofocus}
        autoComplete={props.autoComplete ? "true" : "off"}
        placeholder={props.placeholder ? props.placeholder : ""}
      />
    </div>
  );
}
export default CustomInput;
