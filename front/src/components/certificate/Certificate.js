import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ certification, isEditable, fetchCertifications }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          certification={certification}
          onCancelButtonClickEvent={handleIsEditing}
          fetchCertifications={fetchCertifications}
        />
      ) : (
        <CertificateCard
          certification={certification}
          isEditable={isEditable}
          onEditButtonClickEvent={handleIsEditing}
          fetchCertifications={fetchCertifications}
        />
      )}
    </>
  );
}

export default Certificate;
