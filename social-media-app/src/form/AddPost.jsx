import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Flex, Form, Input, Switch, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useState } from "react";
import { imageValidations } from "../utils/validations";
import { useCreatePostMutation } from "../store/apis/post";
import { toast } from "react-toastify";

export default function AddPost({ setShowModal }) {
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();

  const validateFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!imageValidations.types.includes(file.type)) {
        reject("File not supported.");
      }
      if (imageValidations.size < file.size) {
        reject("Image must be less then 20 MB.");
      }
      resolve();
    });
  }, []);

  const handlePreview = async (file) => {
    window.open(file.thumbUrl);
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined) {
          if (key === "file") {
            formData.append("image", data[key].file.originFileObj);
          } else {
            formData.append(key, data[key]);
          }
        }
      }
      const res = await createPost(formData);
      if (res.data) {
        toast.success("Post created successfully.");
      }
      setShowModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      layout={"vertical"}
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        isPrivate: false,
      }}
    >
      {isError ? (
        <Alert
          message={error.data.message}
          type="error"
          style={{ marginBottom: 10 }}
        />
      ) : (
        ""
      )}
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Title is required",
          },
        ]}
      >
        <Input placeholder="Post title" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea
          placeholder="Post description"
          rows={4}
          autoSize={false}
          style={{ resize: "none" }}
        />
      </Form.Item>
      <Form.Item label="Post Image" name="file">
        <Upload
          listType="picture-card"
          beforeUpload={validateFile}
          maxCount={1}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={(data) => setFileList(data.fileList)}
          onRemove={() => setFileList([])}
        >
          {fileList.length ? null : (
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          )}
        </Upload>
      </Form.Item>
      {/* <Form.Item name="isPrivate" valuePropName="checked">
        <Checkbox>Private Post</Checkbox>
      </Form.Item> */}
      <Form.Item label="Private post" name="isPrivate" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Flex justify="center" gap={"small"}>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" danger htmlType="reset">
              Reset
            </Button>
          </Form.Item>
        </Col>
      </Flex>
    </Form>
  );
}
