-- AlterTable
ALTER TABLE "userCoins" ALTER COLUMN "userCoinTotal" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userQuests" ALTER COLUMN "quests" DROP NOT NULL,
ALTER COLUMN "questCoinWorth" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userRewards" ALTER COLUMN "rewards" DROP NOT NULL,
ALTER COLUMN "rewardCoinCost" DROP NOT NULL;
