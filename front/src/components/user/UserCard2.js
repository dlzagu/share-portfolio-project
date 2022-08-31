import React from "react";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../bookmark/BookmarkButton";

function UserCard2({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const handlerEditClick = () => {
    setIsEditing(true);
  };

  const handlerPortfolioClick = () => {
    if (!isNetwork) return;
    navigate(`/users/${user.id}`);
  };

  const UserInformation = () => {
    return (
      <div className="network-item-info">
        <h3 className="user-title">{user?.name}</h3>
        <h3 className="user-email">{user?.email}</h3>
        <span className="user-descriptiom">{user?.description}</span>
        {isEditable && (
          <button className="button-style" onClick={handlerEditClick}>
            EDIT
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="item-box">
      <div className="item-wrap" onClick={handlerPortfolioClick}>
        <UserInformation />
        <img
          className="item-img"
          src={
            user.profileImageUrl ||
            `${process.env.PUBLIC_URL}/images/profile.PNG`
          }
          alt="userImg"
        />
      </div>
      <BookmarkButton user={user} />
    </div>
  );
}

export default UserCard2;
