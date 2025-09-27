import { notFound } from "next/navigation"; // New imports
import { auth } from "@/lib/auth"; // New import
import { fetchUserByIdAction } from "@/lib/actions/user"; // Re-import to get full user data

import { UserProfile } from "./components/user-profile";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const UserProfilePage = async ({ params }: Props) => {
  const session = await auth(); // Get current session
  const requestedUserId = (await params).userId;

  const response = await fetchUserByIdAction(requestedUserId);

  if (!response.success) {
    // If user not found, or other error, show 404
    notFound();
  }

  const user = response.data;

  // Check for anonymous access
  if (user.isAnonymous && session?.user?.id !== requestedUserId) {
    // If user is anonymous AND the viewer is not the user themselves,
    // then deny access.
    // Using notFound() for a cleaner UX than a generic error page.
    notFound();
  }

  return <UserProfile userId={requestedUserId} />;
};

export default UserProfilePage;
