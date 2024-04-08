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
    filterOptions.forEach((option) => {
      if (data.includes(option.value)) {
        params.set(option.value, true);
      } else {
        params.set(option.value, false);
      }
    });
    setParams(params);
  };

  return (
    <Row
      style={{
        padding: 15,
        zIndex: 10,
        width: "100%",
        justifyContent: "space-between",
      }}
      gutter={[20, 20]}
    >
      <Col lg={12} md={12} sm={24} xs={24}>
        <Input
          size="large"
          defaultValue={params.get("search")}
          onChange={handleChange}
          placeholder="Filter by post title"
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
          defaultValue={filterOptions
            .filter((option) => params.get(option.label))
            .map((option) => option.value)}
          onChange={handleFilterChange}
        />
      </Col>
    </Row>
  );
}
