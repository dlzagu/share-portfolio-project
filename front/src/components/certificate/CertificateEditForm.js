import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useForm } from "../../hooks/useForm";

function CertificateEditForm({
  certification,
  onCancelButtonClickEvent,
  fetchCertifications,
}) {
  const [values, isValid, handleChange] = useForm({
    ...certification,
  });

  const { title, detail, certificationDate, all } = isValid || {};

  const handleEditCertification = async () => {
    if (all) {
      await Api.put(`api/certification/${certification._id}`, { ...values });
      fetchCertifications();
      onCancelButtonClickEvent();
    }
  };

  return (
    <Form>
      <Form.Group controlId="certificateEditTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          value={values.title}
          name="title"
          onChange={handleChange}
        />
        {title || (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="certificateEditDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={values.detail}
          name="detail"
          onChange={handleChange}
        />
        {detail || (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group as={Row} controlId="certificateEditDate" className="mt-3">
        <Col xs="auto">
          <Form.Control
            type="date"
            name="certificationDate"
            value={values.certificationDate}
            onChange={handleChange}
          />
          {certificationDate || (
            <Form.Text className="text-danger">취득일을 기입해주세요</Form.Text>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button
            variant="primary"
            className="me-3"
            onClick={handleEditCertification}
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

export default CertificateEditForm;
