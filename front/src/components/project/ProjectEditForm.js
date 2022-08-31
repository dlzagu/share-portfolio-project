import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useForm } from "../../hooks/useForm";

const dateValidate = (start, end) => {
  const [startDate, endDate] = [new Date(start), new Date(end)];
  if (startDate > endDate) return false;
  return true;
};

function ProjectEditForm({ project, onCancelButtonClickEvent, fetchProjects }) {
  const [values, isValid, handleChange] = useForm({ ...project });

  const { title, detail, startDate, endDate, all } = isValid || {};
  const isCorrectDates = dateValidate(values.startDate, values.endDate);

  const handleEditProject = async () => {
    if (all) {
      await Api.put(`api/project/${project._id}`, { ...values });
      fetchProjects();
      onCancelButtonClickEvent();
    }
  };

  return (
    <Form className="mt-3 mb-3">
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        {title || (
          <Form.Text className="text-danger">
            프로젝트 제목은 5글자 이상이여야 합니다.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          name="detail"
          value={values.detail}
          onChange={handleChange}
        />
        {detail || (
          <Form.Text className="text-danger">
            상세내역은 5글자 이상이여야 합니다.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3 w-50">
        <Row>
          <Col>
            <Form.Control
              type="date"
              name="startDate"
              value={values.startDate}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="date"
              name="endDate"
              value={values.endDate}
              onChange={handleChange}
            />
          </Col>
        </Row>
        {(startDate && endDate && isCorrectDates) || (
          <Form.Text className="text-danger">
            시작일과 종료일을 바르게 기입해주세요.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="d-flex justify-content-center">
        <Button
          variant="primary"
          className="me-3"
          onClick={handleEditProject}
          disabled={!all || !isCorrectDates}
        >
          확인
        </Button>
        <Button variant="secondary" onClick={onCancelButtonClickEvent}>
          취소
        </Button>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
