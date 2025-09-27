-- CreateIndex
CREATE INDEX "Post_createAt_idx" ON "public"."Post"("createAt");

-- CreateIndex
CREATE INDEX "Post_user_id_idx" ON "public"."Post"("user_id");

-- CreateIndex
CREATE INDEX "Post_thread_id_idx" ON "public"."Post"("thread_id");

-- CreateIndex
CREATE INDEX "Post_parent_id_idx" ON "public"."Post"("parent_id");

-- CreateIndex
CREATE INDEX "Thread_created_at_idx" ON "public"."Thread"("created_at");

-- CreateIndex
CREATE INDEX "Thread_user_id_idx" ON "public"."Thread"("user_id");

-- CreateIndex
CREATE INDEX "User_created_at_idx" ON "public"."User"("created_at");
