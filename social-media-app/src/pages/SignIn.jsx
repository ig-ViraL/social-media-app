import { Alert, Button, Card, Col, Flex, Form, Input, Row } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../store/apis/auth";
import { useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  const onSubmit = useCallback(
    async (data) => {
      try {
        const response = await signIn(data);
        await setAuth(response.data.data.accessToken);
        navigate("/home");
      } catch (e) {
        console.log(e);
      }
    },
    [navigate, setAuth, signIn]
  );

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={22} md={15} lg={10} xl={7}>
        <Card bordered={false}>
          <Form
            disabled={isLoading}
            layout="vertical"
            name="sign-in-form"
            onFinish={onSubmit}
          >
            {isError ? (
              <Alert
                message={error.data.message}
                type="error"
                style={{ marginBottom: 10 }}
              />
            ) : (
              ""
            )}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email address" },
              ]}
            >
              <Input prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} autoComplete="true" />
            </Form.Item>
            <Flex justify="center" gap={"small"}>
              <Col>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Sign In
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type="primary" danger htmlType="reset">
                    Reset
                  </Button>
                </Form.Item>
              </Col>
            </Flex>
          </Form>
          <div style={{ textAlign: "center" }}>
            Don’t have account? <Link to={"/sign-up"}>Sign Up</Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
}
