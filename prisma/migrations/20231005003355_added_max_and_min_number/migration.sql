/*
  Warnings:

  - Added the required column `max_number` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_number` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "max_number" INTEGER NOT NULL,
ADD COLUMN     "min_number" INTEGER NOT NULL;
