"use server";

import { prisma } from "@/lib/db/prisma";

export const fetchAllThreadsAction = async () => {
  try {
    const threads = await prisma.thread.findMany({
      orderBy: [{ viewCount: "desc" }, { createdAt: "desc" }],
    });
    console.log(threads);
    return threads;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Threads fetched");
  }
};

export const fetchAllUsersAction = async () => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Users fetched");
  }
};
