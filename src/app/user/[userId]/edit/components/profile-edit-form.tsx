"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProfileAction } from "@/lib/actions/profile";
import { User, Thread, Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileEditFormProps {
  user: User & {
    threads: Thread[];
    posts: Post[];
  };
}

export const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    
    try {
      await updateProfileAction(user.id, data.name, data.bio || "");
      toast.success("Profile updated successfully!");
      router.push(`/user/${user.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your username and bio information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about yourself..." 
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => router.push(`/user/${user.id}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};