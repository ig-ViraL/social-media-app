import { Flex } from "antd";
import PostFeed from "../components/PostFeed";
import SearchFeed from "../components/SearchFeed";

export default function Home() {
  return (
    <Flex style={{ overflow: "auto" }} vertical>
      <SearchFeed />
      <PostFeed />
    </Flex>
  );
}
