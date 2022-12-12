/*
  Warnings:

  - You are about to drop the column `userCoinTotal` on the `Coins` table. All the data in the column will be lost.
  - Added the required column `coinCount` to the `Coins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coins" DROP COLUMN "userCoinTotal",
ADD COLUMN     "coinCount" INTEGER NOT NULL;
