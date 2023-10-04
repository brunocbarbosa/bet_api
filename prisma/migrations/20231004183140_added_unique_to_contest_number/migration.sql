/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Contest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Contest_number_key" ON "Contest"("number");
