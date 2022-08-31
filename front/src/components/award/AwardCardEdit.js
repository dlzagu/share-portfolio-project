import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import * as Api from "../../api";

const AwardCardEdit = ({ award, onCancelButtonClickEvent, fetchAwards }) => {
  const [values, isValid, handleChange] = useForm({ ...award });

  const { title, detail, all } = isValid || {};

  const handleEditAward = async () => {
    if (all) {
      await Api.put(`api/award/${award._id}`, { ...values });
      fetchAwards();
      onCancelButtonClickEvent();
    }
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group controlled="formAwardTitle">
          <Form.Control
            type="text"
            placeholder="수상내역"
            value={values.title}
            name="title"
            onChange={handleChange}
          />
          {title || (
            <Form.Text className="text-danger">
              수상내역이 올바르지 않습니다.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlled="formAwardDetail">
          <Form.Control
            type="text"
            placeholder="수상내역 설명"
            value={values.detail}
            name="detail"
            onChange={handleChange}
          />
          {detail || (
            <Form.Text className="text-danger">
              수상내역 설명이 올바르지 않습니다.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group as={Row} className="mt-5 text-center mb-5">
          <Col sm={colStyle}>
            <Button
              variant="primary"
              className="me-3"
              onClick={handleEditAward}
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

export default AwardCardEdit;
