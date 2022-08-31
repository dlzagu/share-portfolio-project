import React from "react";
import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";
import * as Api from "../../api";

function ProjectCard({
  project,
  isEditable,
  onEditButtonClickEvent,
  fetchProjects,
}) {
  const [isShow, handleShowButtonClickEvent, handleCloseButtonClickEvent] =
    useModal(false);

  const { title, detail, startDate, endDate } = project || {};

  const handleDeleteProject = async () => {
    await Api.delete("api/project", project._id);
    fetchProjects();
  };

  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{title}</h3>
        <p className="sub-title">{detail}</p>
        <p className="sub-title">
          {startDate} ~ {endDate}
        </p>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button className="mvp-edit-button" onClick={onEditButtonClickEvent}>
            편집
          </button>
          <button
            className="mvp-delete-button"
            onClick={handleShowButtonClickEvent}
          >
            삭제
          </button>
        </div>
      )}
      <ConfirmModal
        isShow={isShow}
        onCloseButtonClickEvent={handleCloseButtonClickEvent}
        onCheckButtonClickEvent={handleDeleteProject}
        msg={`${title}(을)를 목록에서 삭제하시겠습니까?`}
      />
    </div>
  );
}

export default ProjectCard;
