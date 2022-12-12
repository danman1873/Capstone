-- AlterTable
ALTER TABLE "Coins" ALTER COLUMN "userCoinTotal" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Quests" ALTER COLUMN "questCoinWorth" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Rewards" ALTER COLUMN "rewardCoinCost" DROP DEFAULT;
