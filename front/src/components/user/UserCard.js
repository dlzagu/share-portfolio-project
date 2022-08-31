import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import UserModal from "../modal/UserModal";
import UserImageProfileUpload from "./UserImageProfile";
import UserLike from "../user/UserLike";
import UserLikeList from "../user/UserLikeList";
import * as Api from "../../api";
import { UserStateContext } from "../../App";

function UserCard({
  user,
  setIsEditing,
  isEditable,
  isNetwork,
  setUser,
  portfolioOwnerId,
}) {
  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);
  const userState = useContext(UserStateContext);

  const navigate = useNavigate();

  const handlerEditClick = () => {
    setIsEditing(true);
  };

  const handlerPortfolioClick = () => {
    if (!isNetwork) return;
    navigate(`/users/${user.id}`);
  };

  const handleImgClick = () => {
    isEditable && onShowButtonClickEventHandler(true);
  };

  const handleImageUpload = async (uploadedImage) => {
    const res = await fetchUpdaeUserImage.call(this, uploadedImage, user);
    const { success, updatedUser } = res;
    if (success) {
      setUser(updatedUser);
      onCloseButtonClickEventHandler();
    }
  };

  const UserInformation = () => {
    return (
      <div className="single-user-item-info">
        <h3 className="user-name">{user?.name}</h3>
        <p className="user-email">
          <span>{user?.email}</span>
        </p>
        <div className="user-description">
          <p>{user?.description}</p>
        </div>

        <div className="like-container">
          <UserLike
            portfolioOwnerId={portfolioOwnerId}
            user={userState.user?.id}
          ></UserLike>
          <UserLikeList
            portfolioOwnerId={portfolioOwnerId}
            user={userState.user?.id}
          />
        </div>

        {isEditable && (
          <button className="edit-button" onClick={handlerEditClick}>
            EDIT
          </button>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="single-user-item-box">
        <div className="item-wrap" onClick={handlerPortfolioClick}>
          <div className="item-img-contaienr" onClick={handleImgClick}>
            <img
              className="item-img"
              src={user?.profileImageUrl}
              alt="userImg"
            />
          </div>
          <UserInformation />
        </div>
      </div>
      <UserModal
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      >
        <UserImageProfileUpload
          user={user}
          onChangeImageUploadEvent={handleImageUpload}
        />
      </UserModal>
    </React.Fragment>
  );
}

async function fetchUpdaeUserImage(uploadedImg, user) {
  const formData = new FormData();
  formData.append("image", uploadedImg);
  const res = await Api.imageUpload(
    `api/users/profileImage/${user.id}`,
    formData
  );
  return res.data;
}

export default UserCard;
