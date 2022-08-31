import React from "react";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";
import * as Api from "../../api";

function CertificateCard({
  certification,
  isEditable,
  onEditButtonClickEvent,
  fetchCertifications,
}) {
  const [isShow, handleShowButtonClickEvent, handleCloseButtonClickEvent] =
    useModal(false);

  const { title, detail, certificationDate } = certification || {};

  const handleDeleteCertification = async () => {
    await Api.delete("api/certification", certification._id);
    fetchCertifications();
  };

  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{title}</h3>
        <p className="sub-title">{detail}</p>
        <p className="sub-title">{certificationDate.split("T")[0]}</p>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button className="mvp-edit-button" onClick={onEditButtonClickEvent}>
            EDIT
          </button>
          <button
            className="mvp-delete-button"
            onClick={handleShowButtonClickEvent}
          >
            DELETE
          </button>
        </div>
      )}
      <ConfirmModal
        isShow={isShow}
        onCloseButtonClickEvent={handleCloseButtonClickEvent}
        onCheckButtonClickEvent={handleDeleteCertification}
        msg={`${title}(을)를 목록에서 삭제하시겠습니까?`}
      />
    </div>
  );
}

export default CertificateCard;
