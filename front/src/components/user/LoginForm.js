import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import * as Api from "../../api";
import { DispatchContext } from "../../App";
import Storage from "../../storage/storage";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const [values, isValid, handleChange] = useForm({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("api/user/login", { ...values });
      const user = res.data.data;
      const jwtToken = user.token;
      Storage.setItem(jwtToken);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <section className="section login-content">
        <div className="title-container">
          <h2 className="login-title">Login</h2>
          <p className="login-sub-title">
            Welcome to SYP. Please log in to use the service.
            <br></br>Share Your Portfolio !
          </p>
        </div>
        <Container>
          <Row className="justify-content-md-center mt-5">
            <Col lg={8}>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Adress</Form.Label>
                  <Form.Control
                    type="email"
                    autoComplete="on"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                  />
                  {!isValid.email && (
                    <Form.Text className="text-success">
                      이메일 형식이 올바르지 않습니다.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="on"
                    value={values.password}
                    name="password"
                    onChange={handleChange}
                  />
                  {!isValid.password && (
                    <Form.Text className="text-success">
                      비밀번호는 4글자 이상입니다.
                    </Form.Text>
                  )}
                </Form.Group>
                {errorMessage && (
                  <Form.Text className="text-danger">{errorMessage}</Form.Text>
                )}
                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={!isValid.all}
                    >
                      로그인
                    </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 text-center">
                  <Col sm={{ span: 20 }}>
                    <Button
                      variant="light"
                      onClick={() => navigate("/register")}
                    >
                      회원가입하기
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default LoginForm;
