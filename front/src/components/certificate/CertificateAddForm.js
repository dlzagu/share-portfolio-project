import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import { useForm } from "../../hooks/useForm";

function CertificateAddForm({ onCancelButtonClickEvent, fetchCertifications }) {
  const [values, isValid, handleChange] = useForm({
    title: "",
    detail: "",
    certificationDate: "",
  });

  const { title, detail, certificationDate, all } = isValid || {};

  const handleAddCertification = async () => {
    if (all) {
      await Api.post("api/certification", { ...values });
      fetchCertifications();
      onCancelButtonClickEvent();
    }
  };

  return (
    <Form>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          name="title"
          onChange={handleChange}
        />
        {title || (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="certificateAddDetail" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          name="detail"
          onChange={handleChange}
        />
        {detail || (
          <Form.Text className="text-danger">5글자 이상 적어주세요</Form.Text>
        )}
      </Form.Group>
      <Form.Group as={Row} controlId="certificateAddDate" className="mt-3">
        <Col xs="auto">
          <Form.Control
            type="date"
            name="certificationDate"
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
            onClick={handleAddCertification}
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

export default CertificateAddForm;
