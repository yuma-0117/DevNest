import { PageField } from "./components/page-field";

const ThreadPage = async ({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) => {
  const { threadId } = await params;

  return <PageField threadId={threadId} />;
};

export default ThreadPage;
