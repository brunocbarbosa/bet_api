/*
  Warnings:

  - You are about to drop the column `bets` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "bets";

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "bet_number" INTEGER NOT NULL,
    "ticket_id" TEXT NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
