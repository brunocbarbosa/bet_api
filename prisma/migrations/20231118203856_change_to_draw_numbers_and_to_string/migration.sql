/*
  Warnings:

  - You are about to drop the column `draw_number` on the `Contest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "draw_number",
ADD COLUMN     "draw_numbers" TEXT NOT NULL DEFAULT 'null';
