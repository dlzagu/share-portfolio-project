import useModal from "../../hooks/useModal";
import ConfirmModal from "../modal/ConfirmModal";
import * as Api from "../../api";

const AwardCard = ({
  award,
  isEditable,
  onEditButtonClickEvent,
  fetchAwards,
}) => {
  const [isShow, handleShowButtonClickEvent, handleCloseButtonClickEvent] =
    useModal(false);

  const { title, detail } = award || {};

  const handleDeleteAward = async () => {
    await Api.delete("api/award", award._id);
    fetchAwards();
  };

  return (
    <div className="mvp-content-detail">
      <div className="mvp-info">
        <h3 className="title">{title}</h3>

        <p className="sub-title">
          <span>{detail}</span>
        </p>
      </div>
      {isEditable && (
        <div className="mvp-management">
          <button onClick={onEditButtonClickEvent} className="mvp-edit-button">
            edit
          </button>
          <button
            onClick={handleShowButtonClickEvent}
            className="mvp-delete-button"
          >
            delete
          </button>
        </div>
      )}
      <ConfirmModal
        isShow={isShow}
        onCloseButtonClickEvent={handleCloseButtonClickEvent}
        onCheckButtonClickEvent={handleDeleteAward}
        msg={`${title}(을)를 목록에서 삭제하시겠습니까?`}
      />
    </div>
  );
};

export default AwardCard;
