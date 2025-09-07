/*
  Warnings:

  - You are about to drop the column `has_images` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `has_images` on the `threads` table. All the data in the column will be lost.
  - You are about to drop the `post_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `thread_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."post_images" DROP CONSTRAINT "post_images_post_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."thread_images" DROP CONSTRAINT "thread_images_thread_id_fkey";

-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "has_images";

-- AlterTable
ALTER TABLE "public"."threads" DROP COLUMN "has_images";

-- DropTable
DROP TABLE "public"."post_images";

-- DropTable
DROP TABLE "public"."thread_images";
