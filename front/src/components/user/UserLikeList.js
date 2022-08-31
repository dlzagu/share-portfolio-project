import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import UserModal from "../modal/UserModal";
import { Modal } from "react-bootstrap";
import * as Api from "../../api";

function UserLikeList({ portfolioOwnerId, user }) {
  const [likeList, setLikeList] = useState([]);

  const [
    isShow,
    onShowButtonClickEventHandler,
    onCloseButtonClickEventHandler,
  ] = useModal(false);

  const handleUserLikeButtonClick = async () => {
    onShowButtonClickEventHandler(true);
    const res = await Api.get(`api/likelist/${portfolioOwnerId}`);
    setLikeList(res.data.liked);
  };

  return (
    <div className="like-list-container">
      <button onClick={handleUserLikeButtonClick} className="like-list-button">
        Who Likes?
      </button>
      <UserModal
        isShow={isShow}
        onCloseButtonClickEvent={onCloseButtonClickEventHandler}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Who Likes?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="like-list">
            {likeList.map((user) => (
              <li key={user.name}>
                {user.name}
                <hr />
              </li>
            ))}
          </div>
        </Modal.Body>
      </UserModal>
    </div>
  );
}

export default UserLikeList;
