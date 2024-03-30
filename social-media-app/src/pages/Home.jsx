import { Button, Flex, Modal, Tooltip } from "antd";
import PostFeed from "../components/PostFeed";
import SearchFeed from "../components/SearchFeed";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import AddPost from "../form/AddPost";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Flex style={{ overflow: "auto" }} vertical>
      <SearchFeed />
      <PostFeed />
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
        open={showModal}
        maskClosable={true}
        onCancel={() => setShowModal(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        destroyOnClose
      >
        <AddPost setShowModal={setShowModal} />
      </Modal>
    </Flex>
  );
}
