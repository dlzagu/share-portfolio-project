import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import Icon from "../icon/Icon";

const BookmarkButton = ({ user }) => {
  const userState = useContext(UserStateContext);
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [bookmarks, setBookmarks] = useState("");

  const loginUserId = userState.user.id;
  const userCardId = user.id;

  const setInitialToggleBookmark = async () => {
    setBookmarks(userState.user.bookmarks);

    if (!bookmarks) return;

    if (bookmarks.includes(userCardId)) {
      setToggleBookmark(true);
    } else {
      setToggleBookmark(false);
    }
  };

  useEffect(() => {
    setInitialToggleBookmark();
  }, [bookmarks, userState]);

  const handleToggleBookmark = async () => {
    if (toggleBookmark === true) {
      const res = await Api.put(
        `users/bookmarks/${loginUserId}?bookmark=remove`,
        {
          bookmarkId: userCardId,
        }
      );
      userState.user.bookmarks = res.data;
      setToggleBookmark(false);
      return;
    }

    const res = await Api.put(`users/bookmarks/${loginUserId}?bookmark=add`, {
      bookmarkId: userCardId,
    });
    userState.user.bookmarks = res.data;
    setToggleBookmark(true);
  };

  return (
    <div className="bookmark-button-container">
      {userState.user.id !== user.id && (
        <button
          onClick={handleToggleBookmark}
          style={{
            fontSize: "30px",
            color: "#0d1e2d",
            border: "none",
            backgroundColor: "transparent",
          }}
        >
          {toggleBookmark ? (
            <Icon name={"bookmark"} />
          ) : (
            <Icon name={"regularBookmark"} />
          )}
        </button>
      )}
    </div>
  );
};

export default BookmarkButton;
