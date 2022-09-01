import React, { useState, useContext } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { MdDelete, MdCreate } from "react-icons/md";
import * as Api from "../../api";
import CommentEdit from "./CommentEdit";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";
import { UserStateContext } from "../../App";

const ContentCard = ({ comment, setComments, fetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const userState = useContext(UserStateContext);
  const loginId = userState.user?.id;
  const [isShow, handleShowButtonClickEvent, handleCloseButtonClickEvent] =
    useModal(false);

  const handleDeleteComment = async () => {
    await Api.delete("api/comment", comment._id);
    fetch();
  };

  return (
    <CardItemBlock>
      <Card scrollable="true">
        {!isEdit ? (
          <>
            {comment.writerUser.name} : {comment.comment}
            {/* 자신이 쓴 댓글만 수정, 삭제 할 수 있도록 조건부 렌더링 */}
            {loginId === comment.writerUser.id && (
              <IconBlock>
                <Edit>
                  <MdCreate
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  />
                </Edit>
                <Remove>
                  <MdDelete onClick={handleShowButtonClickEvent} />
                </Remove>
              </IconBlock>
            )}
          </>
        ) : (
          <CommentEdit
            comment={comment}
            setComments={setComments}
            setIsEdit={setIsEdit}
            fetch={fetch}
          />
        )}
      </Card>
      <ConfirmModal
        isShow={isShow}
        onCloseButtonClickEvent={handleCloseButtonClickEvent}
        onCheckButtonClickEvent={handleDeleteComment}
        msg={`해당 댓글을 삭제하시겠습니까?`}
      />
    </CardItemBlock>
  );
};

export default ContentCard;

// 펜 모양 보여주는 컴포넌트
const Edit = styled.div`
  width: fit-content;
  color: #dee2e6;
  margin-right: 5px;
  font-size: 1.2rem;
  &:hover {
    color: #7cd1b8;
  }
`;

// 쓰레기통 보여주는 컴포넌트
const Remove = styled.div`
  width: fit-content;
  color: #dee2e6;
  font-size: 1.2rem;
  &:hover {
    color: #ff6b6b;
  }
`;

const IconBlock = styled.div`
  display: flex;
  width: fit-content;
  position: relative;
  left: 12.5rem;
`;

const CardItemBlock = styled.div`
  width: 20rem;
`;
