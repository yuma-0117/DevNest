"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/lib/actions/post";

import { DeleteIcon } from "../icons/delete-icon";

interface PostDeleteButtonProps {
  postId: string;
}

export const PostDeleteButton = ({ postId }: PostDeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      const result = await deletePostAction(postId);
      if (result) {
        router.refresh();
      } else {
        alert("Failed to delete the post.");
      }
    }
  };

  return (
    <Button variant="delete" onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  );
};
