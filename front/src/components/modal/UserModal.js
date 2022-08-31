import { Modal, Button } from "react-bootstrap";
import ErrorUtil from "../../util/errorUtil";

/**
 * UserModal: User에 대한 모든 내용을 UserModal을 통해 Modal로 확인할 수 있도록 작성했습니다.
 * 전달 받은 children 에 따라서 Modal의 내용이 달라지도록 합니다.
 * props
 * onCloseButtonClickEvent: function
 * childern: child component
 */
const UserModal = ({ isShow, onCloseButtonClickEvent, children }) => {
  const handleCloseButtonClick = () => {
    ErrorUtil.typeCheck(onCloseButtonClickEvent, "function");
    onCloseButtonClickEvent(false);
  };

  return (
    <Modal
      show={isShow}
      onHide={handleCloseButtonClick}
      backdrop="static"
      keyboard={false}
      scrollable={true}
    >
      {children}
      <Button variant="primary" onClick={handleCloseButtonClick}>
        Close
      </Button>
    </Modal>
  );
};

export default UserModal;
