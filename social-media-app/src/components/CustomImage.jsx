import { PropTypes } from "prop-types";
import { Spin } from "antd";
import { useGetFeedImageQuery } from "../store/apis/post";
import { Image } from "antd";

export default function CustomImage({ postId }) {
  const { data, isLoading } = useGetFeedImageQuery({ postId });
  return (
    <>
      {isLoading ? (
        <Spin size={"default"} />
      ) : (
        <Image
          src={data.imageData}
          alt="Post Image"
          style={{ maxHeight: "10%" }}
        />
      )}
    </>
  );
}

CustomImage.propTypes = {
  postId: PropTypes.string,
};
