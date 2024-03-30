import { Flex } from "antd";

export default function Profile() {
  return (
    <Flex style={{ height: "100%" }}>
      <ProfileSection />
      <UserPostSection />
    </Flex>
  );
}
