import React, { useState, useEffect, useCallback } from "react";
import { Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function CertificateContainer({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [certifications, setCertifications] = useState([]);

  const handleIsAdding = () => {
    setIsAdding(!isAdding);
  };

  const fetchCertifications = useCallback(() => {
    Api.get("api/certification", `?userId=${portfolioOwnerId}`).then((res) =>
      setCertifications(res.data.data)
    );
  }, [portfolioOwnerId]);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  return (
    <div className="mvp-content">
      <h3 className="mvp-title">Certificate</h3>
      {certifications.map((certification) => (
        <Certificate
          certification={certification}
          isEditable={isEditable}
          fetchCertifications={fetchCertifications}
          key={certification._id}
        />
      ))}
      {isEditable && (
        <Row className="mt-3 text-center mb-4">
          <Col sm={{ span: 20 }}>
            <Button onClick={handleIsAdding}>+</Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <CertificateAddForm
          onCancelButtonClickEvent={handleIsAdding}
          fetchCertifications={fetchCertifications}
        />
      )}
    </div>
  );
}

export default CertificateContainer;
