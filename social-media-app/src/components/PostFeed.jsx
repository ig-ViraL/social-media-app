import { Flex, Spin } from "antd";
import { useGetFeedPostQuery } from "../store/apis/post";
import { useSearchParams } from "react-router-dom";
import Post from "./Post";
import { toast } from "react-toastify";

export default function PostFeed() {
  const [params] = useSearchParams();
  const { data, isFetching, isLoading, error } = useGetFeedPostQuery(
    {
      search: params.get("search"),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (error) {
    toast.error(error.message);
  }

  return (
    <Flex
      style={{ height: "100%" }}
      justify="center"
      align="center"
      gap={"large"}
      vertical
    >
      {isLoading || isFetching ? (
        <Spin size={"large"} />
      ) : data?.data?.data?.length ? (
        data?.data?.data?.map((post) => <Post data={post} key={post._id} />)
      ) : (
        "No posts available"
      )}
    </Flex>
  );
}
