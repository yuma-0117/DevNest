"use client";

import { useRouter } from "next/navigation";
import { useState } from "react"; // Added useState

import { Button } from "@/components/ui/button";
import { deletePostAction } from "@/lib/actions/post";

import { DeleteIcon } from "../icons/delete-icon";

interface PostDeleteButtonProps {
  postId: string;
}

export const PostDeleteButton = ({ postId }: PostDeleteButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false); // Added isDeleting state

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      setIsDeleting(true); // Set loading state
      const result = await deletePostAction(postId);
      if (result) {
        router.refresh();
      } else {
        alert("Failed to delete the post.");
      }
      setIsDeleting(false); // Reset loading state
    }
  };

  return (
    <Button variant="delete" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : <DeleteIcon />}
    </Button>
  );
};
