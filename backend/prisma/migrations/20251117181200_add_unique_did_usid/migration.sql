/*
  Warnings:

  - A unique constraint covering the columns `[user_id,district_id]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ratings_user_id_district_id_key" ON "ratings"("user_id", "district_id");
