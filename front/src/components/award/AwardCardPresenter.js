import React, { useState } from "react";
import AwardCard from "./AwardCard";
import AwardCardEdit from "./AwardCardEdit";

const AwardCardPresenter = ({ award, isEditable, fetchAwards }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <AwardCardEdit
          award={award}
          onCancelButtonClickEvent={handleIsEditing}
          fetchAwards={fetchAwards}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          onEditButtonClickEvent={handleIsEditing}
          fetchAwards={fetchAwards}
        />
      )}
    </React.Fragment>
  );
};

export default AwardCardPresenter;
