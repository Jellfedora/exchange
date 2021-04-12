import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Resizer from "react-image-file-resizer";

const CustomeFileInput = (props) => {
  const onChange = async (e) => {
    // console.log(e);
    props.goAvatarSpinner();
    try {
      const file = e;
      const image = await resizeFile(file);
      // console.log(image);
      props.submitEditAvatar(image);
    } catch (err) {
      console.log(err);
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  return (
    <div>
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        // onChange={(e) => props.submitEditAvatar(e.target.files[0])}
        onChange={(e) => onChange(e.target.files[0])}
      />
      <label htmlFor="avatar">
        <FontAwesomeIcon icon="camera" size="2x" />
      </label>
    </div>
  );
};
export default CustomeFileInput;
