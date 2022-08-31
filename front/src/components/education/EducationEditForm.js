import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import * as Api from "../../api";
import { useForm } from "../../hooks/useForm";

function EducationEditForm({
  education,
  onCancelButtonClickEvent,
  fetchEducations,
}) {
  const [values, isValid, handleChange] = useForm({
    ...education,
  });

  const { university, major, status, all } = isValid || {};

  const handleEditEducation = async () => {
    if (all) {
      await Api.put(`api/education/${education._id}`, { ...values });
      fetchEducations();
      onCancelButtonClickEvent();
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={values.university}
          name="university"
          onChange={handleChange}
        />
        {university || (
          <Form.Text className="text-danger">
            학교 이름을 4글자 이상 입력해주세요.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={values.major}
          name="major"
          onChange={handleChange}
        />
        {major || (
          <Form.Text className="text-danger">
            전공을 4글자 이상 입력해주세요.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Check
        className="mt-3"
        inline
        type="radio"
        name="status"
        label="재학중"
        value="재학중"
        checked={values.status === "재학중"}
        onChange={handleChange}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="학사졸업"
        value="학사졸업"
        checked={values.status === "학사졸업"}
        onChange={handleChange}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="석사졸업"
        value="석사졸업"
        checked={values.status === "석사졸업"}
        onChange={handleChange}
      />
      <Form.Check
        inline
        type="radio"
        name="status"
        label="박사졸업"
        value="박사졸업"
        checked={values.status === "박사졸업"}
        onChange={handleChange}
      />
      {status || (
        <Form.Text className="text-danger">학력을 선택해주세요.</Form.Text>
      )}

      <Form.Group className="mt-3 text-center mb-3">
        <Col sm={{ span: 20 }}>
          <Button
            variant="primary"
            className="me-3"
            onClick={handleEditEducation}
            disabled={!all}
          >
            확인
          </Button>
          <Button variant="secondary" onClick={onCancelButtonClickEvent}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
