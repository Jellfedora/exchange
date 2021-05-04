import React from "react";
import TextareaAutosize from "react-textarea-autosize";

function CustomTextarea(props) {
  return (
    <TextareaAutosize
      type={props.type}
      name={props.name}
      //   defaultValue={props.defaultValue ? props.defaultValue : ""}
      value={props.value}
      onChange={props.onChange}
      autoFocus={props.autofocus}
      autoComplete={props.autoComplete ? "true" : "off"}
      placeholder={props.placeholder ? props.placeholder : ""}
      maxRows={10}
    />
  );
}
export default CustomTextarea;
