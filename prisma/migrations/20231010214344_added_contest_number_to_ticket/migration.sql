/*
  Warnings:

  - A unique constraint covering the columns `[contest_number]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contest_number` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "contest_number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_contest_number_key" ON "Ticket"("contest_number");
