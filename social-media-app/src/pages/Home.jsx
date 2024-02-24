import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { AndroidOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);

  const sideItems = [
    {
      key: "profile",
      icon: <AndroidOutlined style={{ fontSize: 25 }} />,
      // children: <Link to={"/user-profile"}>Profile</Link>,
      label: "Profile",
    },
    {
      key: "home",
      icon: <HomeOutlined style={{ fontSize: 25 }} />,
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
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={sideItems}
          style={{ paddingTop: 50 }}
        />
      </Sider>
    </>
  );
}
