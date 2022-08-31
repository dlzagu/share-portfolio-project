import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import { DispatchContext } from "../../App";
import {
  varColors,
  varFontSize,
  varFontWeight,
  varLineHeight,
  varSpacing,
} from "../../util/theme/theme";
import * as Api from "../../api";
import Storage from "../../storage/storage";

const UserConfirmPassword = ({ user }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const [values, isValid, handleChange] = useForm({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const { password, all } = isValid || {};

  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const isPasswordSame = values.password === values.confirmPassword;

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!all || !isPasswordSame) {
      return;
    }
    Api.put(`api/users/password/${user.id}`, {
      currentPassword: values.currentPassword,
      newPassword: values.password,
    })
      .then(() => {
        Storage.removeItem();
        setErrorMsg("");
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch(() => {
        setErrorMsg("비밀번호가 일치하지 않습니다!");
      });
  };

  return (
    <form style={formStyle} onSubmit={handleSubmitClick}>
      <div style={titleStyle}>Change Password</div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="currentPassword"
          style={inputStyle}
          onChange={handleChange}
        />
        {errorMsg && <Form.Text className="text-danger">{errorMsg}</Form.Text>}
      </div>
      <div>
        <label>New password</label>
        <input
          type="password"
          name="password"
          style={inputStyle}
          onChange={handleChange}
        />
        {!password && (
          <Form.Text className="text-danger">
            비밀번호는 4글자 이상, 12글자 이하여야 합니다
          </Form.Text>
        )}
      </div>
      <div>
        <label>Check new password</label>
        <input
          type="password"
          name="confirmPassword"
          style={inputStyle}
          onChange={handleChange}
        />
        {!isPasswordSame && (
          <Form.Text className="text-danger">
            비밀번호가 일치하지 않습니다.
          </Form.Text>
        )}
      </div>
      <button
        type="submit"
        style={buttonStyle}
        disabled={!all || !isPasswordSame ? true : false}
      >
        CONFIRM
      </button>
    </form>
  );
};

const formStyle = {
  margin: "auto",
  width: "100%",
  color: varColors.light.coolBlack,
  fontFamily: "system-ui",
};

const titleStyle = {
  fontSize: varFontSize.bp1024(5),
  lineHeight: varLineHeight.bp1024(8),
  fontWeight: varFontWeight.bold,
  textAlign: "center",
  marginBottom: "10px",
};

const inputStyle = {
  backgroundColor: varColors.light.coolWhiteGray,
  width: "100%",
  height: varSpacing.bp1024(5),
  outline: "none",
  border: "0px",
  fontSize: varFontSize.bp1024(4),
  lineHeight: varLineHeight.bp1024(4),
  padding: varSpacing.bp1024(1),
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: varColors.light.coolLightGray,
  },
  marginBottom: "10px",
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

export default UserConfirmPassword;
