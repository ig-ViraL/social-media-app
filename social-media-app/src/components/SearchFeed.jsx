import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";

export default function SearchFeed() {
  return (
    <Row
      style={{
        position: "sticky",
        top: 0,
        padding: 15,
        zIndex: 10,
        height: 70,
        backgroundColor: "white",
      }}
    >
      <Col lg={16}>
        <Input
          size="large"
          placeholder="Search for specific title"
          prefix={<SearchOutlined />}
        />
      </Col>
      <Col lg={8}></Col>
    </Row>
  );
}
