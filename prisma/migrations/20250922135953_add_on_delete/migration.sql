-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Thread" DROP CONSTRAINT "Thread_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Thread" ADD CONSTRAINT "Thread_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "public"."Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
