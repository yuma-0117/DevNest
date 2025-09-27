// src/app/user/[userId]/components/anonymous-toggle.tsx
"use client";

import { useState, useTransition } from "react";
// import { Switch } from "@/components/ui/switch"; // Removed
// import { Label } from "@/components/ui/label"; // Removed
import { updateUserAnonymousStatusAction } from "@/lib/actions/user";
// import { toast } from "sonner"; // Assuming sonner is used for toasts

interface AnonymousToggleProps {
  userId: string;
  initialIsAnonymous: boolean;
}

export const AnonymousToggle = ({ userId, initialIsAnonymous }: AnonymousToggleProps) => {
  const [isAnonymous, setIsAnonymous] = useState(initialIsAnonymous);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsAnonymous(checked); // Optimistic update

    startTransition(async () => {
      const response = await updateUserAnonymousStatusAction(userId, checked);
      if (!response.success) {
        // toast.error(response.error || "Failed to update anonymous status.");
        alert(response.error || "Failed to update anonymous status."); // Using alert for now
        setIsAnonymous(initialIsAnonymous); // Revert on error
      } else {
        // toast.success("Anonymous status updated successfully!");
        alert("Anonymous status updated successfully!"); // Using alert for now
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="anonymous-mode"
        checked={isAnonymous}
        onChange={handleToggle}
        disabled={isPending}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" // Basic styling
      />
      <label htmlFor="anonymous-mode" className="text-sm font-medium text-gray-700">
        {isAnonymous ? "Anonymous Mode ON" : "Anonymous Mode OFF"}
      </label>
    </div>
  );
};