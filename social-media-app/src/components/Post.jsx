import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import PropTypes from "prop-types";
import CustomImage from "./CustomImage";

export default function Post({ data }) {
  return (
    <Card
      style={{
        width: "40%",
      }}
      cover={
        !data.filePath ? (
          <img
            alt="example"
            style={{ height: 300, width: "100%", objectFit: "none" }}
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          />
        ) : (
          <CustomImage postId={data._id} />
        )
      }
    >
      <Meta title={data.title} description={data.description} />
    </Card>
  );
}

Post.propTypes = {
  data: PropTypes.object,
};
