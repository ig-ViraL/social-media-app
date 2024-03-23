import { Button, Flex, Modal, Spin, Tooltip } from "antd";
import { useGetFeedPostQuery } from "../store/apis/post";
import { PlusOutlined } from "@ant-design/icons";
import Post from "./Post";
import { useState } from "react";

export default function PostFeed() {
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading, error } = useGetFeedPostQuery();
  return (
    <Flex
      align="center"
      gap={"large"}
      style={{ height: "calc(100% - 70px)", padding: 30 }}
      vertical
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : error ? (
        "Error"
      ) : data?.data?.data?.length ? (
        data?.data?.data?.map((post) => <Post data={post} key={post._id} />)
      ) : (
        "No posts available"
      )}
      <Tooltip title="Create Post">
        <Button
          size={"large"}
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
          }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setShowModal(true)}
        />
      </Tooltip>
      <Modal
        title="Create New Post"
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
      ></Modal>
    </Flex>
  );
}
