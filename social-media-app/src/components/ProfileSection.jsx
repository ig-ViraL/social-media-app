import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Flex, Row, Typography } from "antd";
const { Title } = Typography;

export default function ProfileSection() {
  return (
    <Row justify={"center"} style={{ height: "30%" }}>
      <Col lg={14}>
        <Row style={{ height: "100%" }} align={"middle"}>
          <Col lg={4} md={8} sm={24} xs={24} style={{ height: "60%" }}>
            <Avatar
              style={{ height: "100%", width: "100%" }}
              icon={<UserOutlined />}
            />
          </Col>
          <Col lg={20} md={16} sm={24} xs={24} style={{ height: "60%" }}>
            <Flex vertical>
              <Title level={2}>Test</Title>
            </Flex>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
