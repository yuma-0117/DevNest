import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Thread } from "@prisma/client";

import { deleteThreadAction } from "../actions";

export const DeleteDialog = ({ thread }: { thread: Thread }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteThreadAction(thread.id);
    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to delete the thread?</DialogTitle>
        </DialogHeader>
        <Button variant="destructive" onClick={handleDelete}>
          Yes
        </Button>
        <DialogClose asChild>
          <Button variant="secondary">No</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
