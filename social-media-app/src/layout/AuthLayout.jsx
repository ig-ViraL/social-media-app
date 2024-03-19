import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { AndroidOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const sideItems = [
    {
      key: "profile",
      icon: <AndroidOutlined style={{ fontSize: 22 }} />,
      // children: <Link to={"/user-profile"}>Profile</Link>,
      label: "Profile",
    },
    {
      key: "home",
      icon: <HomeOutlined style={{ fontSize: 22 }} />,
      // children: <Link to={"/user-profile"}>Profile</Link>,
      label: "Home",
    },
  ];
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={300}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["home"]}
          mode="inline"
          items={sideItems}
          style={{ paddingTop: 50 }}
        />
      </Sider>
      <Outlet />
    </>
  );
}
