/*
  Warnings:

  - Made the column `coinId` on table `Coins` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questId` on table `Quests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewardId` on table `Rewards` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Coins" DROP CONSTRAINT "Coins_coinId_fkey";

-- DropForeignKey
ALTER TABLE "Quests" DROP CONSTRAINT "Quests_questId_fkey";

-- DropForeignKey
ALTER TABLE "Rewards" DROP CONSTRAINT "Rewards_rewardId_fkey";

-- AlterTable
ALTER TABLE "Coins" ALTER COLUMN "coinId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quests" ALTER COLUMN "questId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rewards" ALTER COLUMN "rewardId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Coins" ADD CONSTRAINT "Coins_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quests" ADD CONSTRAINT "Quests_questId_fkey" FOREIGN KEY ("questId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
