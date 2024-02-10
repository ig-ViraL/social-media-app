import { Button, Card, Col, Flex, Form, Input, Layout, Row } from "antd";

export default function SignIn() {
  return (
    <Flex style={{ height: "100vh" }} justify="center" align="center">
      <Col lg={10} md={12} sm={14} xs={16}>
        <Card bordered={false}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email is required",
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
              rules={[
                {
                  required: true,
                  message: "Password is required.",
                },
                {
                  validator: (_, value) => {
                    if()
                  }
                }
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
