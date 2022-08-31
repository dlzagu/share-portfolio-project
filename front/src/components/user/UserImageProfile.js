import { useState } from "react";
import {
  varColors,
  varFontSize,
  varFontWeight,
  varLineHeight,
  varSpacing,
} from "../../util/theme/theme";

const UserImageProfileUpload = ({ user, onChangeImageUploadEvent }) => {
  const [uploadedImg, setUploadedImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const previewImageSrc = previewImg ? previewImg : user?.profileImageUrl;
  const acceptedFile = ["image/jpg", "image/png", "image/jpeg"];
  const isConfirmButtonDisabled = !uploadedImg ? true : false;

  const handleImageUpload = (e) => {
    setUploadedImg(e.target.files[0]);
    const preview = new FileReader();
    preview.readAsDataURL(e.target.files[0]);
    preview.onload = () => {
      setPreviewImg(preview.result);
    };
  };

  const handleImageUploadSubmit = (e) => {
    e.preventDefault();
    onChangeImageUploadEvent(uploadedImg);
  };

  return (
    <form style={containerStyle}>
      <div style={titleStyle}>IMAGE PREVIEW</div>
      <div style={previewWrapperStyle}>
        <img style={previewStyle} src={previewImageSrc} alt="profileImage" />{" "}
      </div>
      <label htmlFor="image-input" style={imageLabelStyle}>
        Image upload
      </label>
      <input
        type="file"
        id="image-input"
        accept={acceptedFile.join(", ")}
        name="image"
        style={imageInputStyle}
        onChange={handleImageUpload}
      />
      <button
        type="submit"
        style={buttonStyle}
        disabled={isConfirmButtonDisabled}
        onClick={handleImageUploadSubmit}
      >
        CONFIRM
      </button>
    </form>
  );
};

const containerStyle = {
  width: "100%",
};

const titleStyle = {
  fontSize: varFontSize.bp1024(5),
  lineHeight: varLineHeight.bp1024(8),
  fontWeight: varFontWeight.bold,
  textAlign: "center",
  marginBottom: "10px",
};

const previewWrapperStyle = {
  textAlign: "center",
};

const previewStyle = {
  width: "30%",
  height: "30%",
};

const imageLabelStyle = {
  width: "100%",
  backgroundColor: varColors.light.coolLightGray,
  color: varColors.light.coolBlack,
  border: "0px",
  borderRadius: "4px",
  marginBottom: "10px",
  padding: varSpacing.bp1024(1),
  cursor: "pointer",
};

const imageInputStyle = {
  display: "none",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: varColors.light.lightSky,
  color: varColors.light.white,
  border: "0px",
  borderRadius: "4px",
  marginBottom: "10px",
  padding: varSpacing.bp1024(1),
};

export default UserImageProfileUpload;
