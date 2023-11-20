/*
  Warnings:

  - Added the required column `draw_number` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "draw_number" INTEGER NOT NULL;
