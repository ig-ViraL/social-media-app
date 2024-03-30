import Sider from "antd/es/layout/Sider";
import { AndroidOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Menu, Spin } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../store/apis/user";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/${e.key}`);
  };

  const { data, isFetching, isLoading } = useGetUserQuery();

  const sideItems = [
    {
      key: "home",
      icon: <HomeOutlined style={{ fontSize: 22 }} />,
      label: "Home",
    },
    {
      key: "profile",
      icon: <AndroidOutlined style={{ fontSize: 22 }} />,
      label: "Profile",
    },
  ];
  return (
    <>
      <Sider breakpoint="sm" collapsedWidth="0">
        <Flex style={{ padding: 10, paddingLeft: 23 }} gap={10} align="center">
          <Avatar
            size="default"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1677ff" }}
          />
          {isFetching || isLoading ? (
            <Spin />
          ) : (
            <span style={{ color: "white", fontSize: 20 }}>
              {data.data.username}
            </span>
          )}
        </Flex>
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${location.pathname.split("/")[1]}`]}
          mode="inline"
          items={sideItems}
          onClick={handleClick}
        />
      </Sider>
      <Outlet />
    </>
  );
}
