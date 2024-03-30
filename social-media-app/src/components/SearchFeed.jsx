import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../utils/functions";
import { useCallback } from "react";

const filterOptions = [
  { label: "My posts only", value: "isMyPostsOnly" },
  { label: "Private Posts", value: "isPrivate" },
];

export default function SearchFeed() {
  const [params, setParams] = useSearchParams();

  const handleChange = useCallback(
    (e) => {
      debounce(() => {
        params.set("search", e.target.value);
        setParams(params);
      }, 500);
    },
    [params, setParams]
  );

  const handleFilterChange = (data) => {
    console.log(data);
  };

  return (
    <Row
      style={{
        position: "sticky",
        top: 0,
        padding: 15,
        zIndex: 10,
        height: 70,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Col lg={12} md={12} sm={24} xs={24}>
        <Input
          size="large"
          defaultValue={params.get("search")}
          onChange={handleChange}
          placeholder="Filter by title"
          prefix={<SearchOutlined />}
        />
      </Col>
      <Col lg={12} md={12} sm={24} xs={24}>
        <Select
          size="large"
          style={{ width: "100%" }}
          mode="multiple"
          placeholder="Filter options"
          options={filterOptions}
          onChange={handleFilterChange}
        />
      </Col>
    </Row>
  );
}
