import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomeFileInput = (props) => {
  return (
    <div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        onChange={(e) => props.submitEditAvatar(e.target.files[0])}
      />
      <label htmlFor="avatar">
        <FontAwesomeIcon icon="camera" size="2x" />
      </label>
    </div>
  );
};
export default CustomeFileInput;
