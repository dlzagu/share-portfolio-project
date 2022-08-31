import { faBookmark, faComment } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularFaBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorUtil from "../../util/errorUtil";

// Fortawesome icons
// Solid-svg-icons, regular-svg-icons 사용
// 추가할 아이콘이 있다면 이곳에 import 합니다.
function Icon({ name }) {
  return <FontAwesomeIcon icon={getIconByName.call(this, name)} />;
}

function getIconByName(name) {
  switch (name) {
    case "bookmark":
      return faBookmark;

    case "regularBookmark":
      return regularFaBookmark;

    case "comment":
      return faComment;

    default:
      ErrorUtil.notImplemented();
  }
}

export default Icon;
