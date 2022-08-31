import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ isEditable, education, fetchEducations }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <EducationEditForm
          education={education}
          onCancelButtonClickEvent={handleIsEditing}
          fetchEducations={fetchEducations}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          onEditButtonClickEvent={handleIsEditing}
          fetchEducations={fetchEducations}
        />
      )}
    </React.Fragment>
  );
}

export default Education;
