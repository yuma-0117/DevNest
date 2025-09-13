import { prisma } from "@/lib/db/prisma";
import { EditForm } from "./components/edit-form";

export default async function ThreadEditPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;

  const thread = await prisma.thread.findFirst({ where: { id: threadId } });

  return <div>{thread && <EditForm thread={thread} />}</div>;
}
