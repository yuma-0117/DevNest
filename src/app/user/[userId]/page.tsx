import { UserProfile } from "./components/user-profile";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const UserProfilePage = async ({ params }: Props) => {
  return <UserProfile userId={(await params).userId} />;
};

export default UserProfilePage;
