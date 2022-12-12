/*
  Warnings:

  - You are about to drop the column `userId` on the `Coins` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Quests` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Rewards` table. All the data in the column will be lost.
  - Added the required column `coinId` to the `Coins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questId` to the `Quests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardId` to the `Rewards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coins" DROP CONSTRAINT "Coins_userId_fkey";

-- DropForeignKey
ALTER TABLE "Quests" DROP CONSTRAINT "Quests_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rewards" DROP CONSTRAINT "Rewards_userId_fkey";

-- DropIndex
DROP INDEX "Coins_userId_key";

-- DropIndex
DROP INDEX "Quests_userId_key";

-- DropIndex
DROP INDEX "Rewards_userId_key";

-- AlterTable
ALTER TABLE "Coins" DROP COLUMN "userId",
ADD COLUMN     "coinId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Quests" DROP COLUMN "userId",
ADD COLUMN     "questId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rewards" DROP COLUMN "userId",
ADD COLUMN     "rewardId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Coins" ADD CONSTRAINT "Coins_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quests" ADD CONSTRAINT "Quests_questId_fkey" FOREIGN KEY ("questId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
