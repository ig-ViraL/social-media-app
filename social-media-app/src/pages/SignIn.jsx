import { Button, Card, Col, Flex, Form, Input } from "antd";

export default function SignIn() {
  const onSubmit = (data) => {
    console.log(data, "::::: data");
  };
  return (
    <Flex style={{ height: "100vh" }} justify="center" align="center">
      <Col lg={10} md={12} sm={14} xs={16}>
        <Card bordered={false}>
          <Form name="Sign-in form" onFinish={onSubmit}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  whitespace: false,
                  message: "Whitespace not allowed.",
                },
                {
                  type: "email",
                  message: "Invalid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              required
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: "Username must contain only letters and numbers!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Flex>
  );
}
