/*
  Warnings:

  - Made the column `userCoinTotal` on table `userCoins` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quests` on table `userQuests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questCoinWorth` on table `userQuests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewards` on table `userRewards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewardCoinCost` on table `userRewards` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "userCoins" ALTER COLUMN "userCoinTotal" SET NOT NULL;

-- AlterTable
ALTER TABLE "userQuests" ALTER COLUMN "quests" SET NOT NULL,
ALTER COLUMN "questCoinWorth" SET NOT NULL;

-- AlterTable
ALTER TABLE "userRewards" ALTER COLUMN "rewards" SET NOT NULL,
ALTER COLUMN "rewardCoinCost" SET NOT NULL;
