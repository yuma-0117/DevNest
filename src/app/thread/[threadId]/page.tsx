import { auth } from "@/lib/auth";

import { PageField } from "./components/page-field";

const ThreadPage = async ({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) => {
  const { threadId } = await params;
  const session = await auth();

  return <PageField threadId={threadId} session={session} />;
};

export default ThreadPage;
