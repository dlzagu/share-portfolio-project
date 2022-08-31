import React, { useContext, useState, useEffect } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import Icon from "../icon/Icon";

const BookmarkButton = ({ user }) => {
  const userState = useContext(UserStateContext);
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const loginUserId = userState.user.id;
  const userCardId = user.id;

  useEffect(() => {
    const setInitialToggleBookmark = () => {
      if (userState.user.bookmarks.length === 0) return;

      setBookmarks(userState.user.bookmarks);

      if (bookmarks.includes(userCardId)) {
        setToggleBookmark(true);
      } else {
        setToggleBookmark(false);
      }
    };
    setInitialToggleBookmark();
  }, [userCardId, bookmarks, userState]);

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
    } else {
      const res = await Api.put(`users/bookmarks/${loginUserId}?bookmark=add`, {
        bookmarkId: userCardId,
      });
      userState.user.bookmarks = res.data;
      setToggleBookmark(true);
    }
  };

  return (
    <div className="bookmark-button-container">
      {userState.user.id !== user.id && (
        <button onClick={handleToggleBookmark} className="bookmark-button">
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
