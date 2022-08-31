import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ project, isEditable, fetchProjects }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <React.Fragment>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          onCancelButtonClickEvent={handleIsEditing}
          fetchProjects={fetchProjects}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          onEditButtonClickEvent={handleIsEditing}
          fetchProjects={fetchProjects}
        />
      )}
    </React.Fragment>
  );
}

export default Project;
