import Sider from "antd/es/layout/Sider";
import { AndroidOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/${e.key}`);
  };

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
      <Sider width={250}>
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${location.pathname.split("/")[1]}`]}
          mode="inline"
          items={sideItems}
          style={{ paddingTop: 50 }}
          onClick={handleClick}
        />
      </Sider>
      <Outlet />
    </>
  );
}
