import React, { useCallback, useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddForm";

function EducationContainer({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  const [educations, setEducations] = useState([]);

  const handleIsAdding = () => {
    setIsAdding(!isAdding);
  };

  const fetchEducations = useCallback(() => {
    Api.get(`api/education`, `?userId=${portfolioOwnerId}`).then((res) =>
      setEducations(res.data.data)
    );
  }, [portfolioOwnerId]);

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  return (
    <div className="mvp-content">
      <h3 className="mvp-title">Education</h3>

      {educations.map((education) => (
        <Education
          key={education._id}
          education={education}
          fetchEducations={fetchEducations}
          isEditable={isEditable}
        />
      ))}
      {isEditable && (
        <Row className="text-center mb-4">
          <Col>
            <Button size="md" onClick={handleIsAdding}>
              +
            </Button>
          </Col>
        </Row>
      )}
      {isAdding && (
        <EducationAddForm
          onCancelButtonClickEvent={handleIsAdding}
          fetchEducations={fetchEducations}
        />
      )}
    </div>
  );
}

export default EducationContainer;
