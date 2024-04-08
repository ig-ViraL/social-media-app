import { Flex } from "antd";
import ProfileSection from "../components/ProfileSection";
import UserPostSection from "../components/UserPostSection";

export default function Profile() {
  return (
    <Flex style={{ height: "100%" }} vertical>
      <ProfileSection />
      <UserPostSection />
    </Flex>
  );
}
