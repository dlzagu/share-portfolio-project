import React, { useContext } from "react";
import { UserStateContext } from "../App";
import UserCard2 from "../components/user/UserCard2";

const BookmarksList = ({ users }) => {
  const userState = useContext(UserStateContext);

  const bookmarks = userState.user.bookmarks;

  return (
    <>
      {users
        .filter((user) => bookmarks.includes(user.id))
        .map((user) => (
          <UserCard2 key={user.id} user={user} isNetwork />
        ))}
    </>
  );
};

export default BookmarksList;
