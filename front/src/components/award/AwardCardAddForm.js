import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import * as Api from "../../api";

const AwardCardAddForm = ({ onCancelButtonClickEvent, fetchAwards }) => {
  const [values, isValid, handleChange] = useForm({ title: "", detail: "" });

  const { title, detail, all } = isValid || {};

  const handleAddAward = async () => {
    if (all) {
      await Api.post("api/award", { ...values });
      fetchAwards();
      onCancelButtonClickEvent();
    }
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group controlId="formAddAwardTitle">
          <Form.Control
            type="text"
            placeholder="수상내역"
            name="title"
            onChange={handleChange}
          />
          {title || (
            <Form.Text className="text-danger">
              수상내역이 올바르지 않습니다.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="formAddAwardDetail">
          <Form.Control
            type="text"
            placeholder="수상내역 설명"
            name="detail"
            onChange={handleChange}
          />
          {detail || (
            <Form.Text className="text-danger">
              수상내역 설명이 올바르지 않습니다.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={colStyle}>
            <Button
              variant="primary"
              className="me-3"
              onClick={handleAddAward}
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
    </React.Fragment>
  );
};

const colStyle = {
  span: 20,
};

export default AwardCardAddForm;
