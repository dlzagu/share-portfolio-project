import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get("api/users", portfolioOwnerId).then((res) => {
      const data = res.data.data;
      data.profileImageUrl =
        data.profileImageUrl || `${process.env.PUBLIC_URL}/images/profile.PNG`;
      setUser(data);
    });
  }, [portfolioOwnerId]);

  return (
    <React.Fragment>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          setUser={setUser}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </React.Fragment>
  );
}

export default User;
