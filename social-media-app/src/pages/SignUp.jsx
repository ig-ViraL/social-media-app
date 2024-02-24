import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Result,
  Row,
} from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useSignUpMutation } from "../store/apis/auth";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUp, { isLoading, isError, error }] = useSignUpMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = useCallback(
    async (data) => {
      try {
        const response = await signUp(data);
        if (response.data) {
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/sign-in");
          }, 3 * 1000);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [navigate, signUp]
  );

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={22} sm={22} md={15} lg={10} xl={7}>
        {showSuccess ? (
          <Result
            status="success"
            title="User signed up successfully!"
            subTitle="You will be redirected to the login page shortly."
          />
        ) : (
          <Card title="Sign Up" bordered={false}>
            <Form
              disabled={isLoading}
              layout="vertical"
              name="sign-up-form"
              onFinish={onSubmit}
              initialValues={{ isPrivate: false }}
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
                label="First Name"
                name="firstname"
                rules={[
                  { required: true, message: "First name is required" },
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message:
                      "First name must contain only alphabets and letters",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[
                  { required: true, message: "Last name is required" },
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message:
                      "Last name must contain only alphabets and letters",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Username is required" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username must contain only letters, numbers, or underscores",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
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
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                    message:
                      "Password must be at least 8 characters long and contain at least one letter and one number",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item name="isPrivate" valuePropName="checked">
                <Checkbox checked={true}>Private Account</Checkbox>
              </Form.Item>
              <Flex justify="center" gap={"small"}>
                <Col>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Sign Up
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
              Already have account? <Link to={"/sign-in"}>Sign In</Link>
            </div>
          </Card>
        )}
      </Col>
    </Row>
  );
}
