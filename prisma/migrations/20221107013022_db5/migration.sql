-- DropForeignKey
ALTER TABLE "userCoins" DROP CONSTRAINT "userCoins_userId_fkey";

-- DropForeignKey
ALTER TABLE "userQuests" DROP CONSTRAINT "userQuests_userId_fkey";

-- DropForeignKey
ALTER TABLE "userRewards" DROP CONSTRAINT "userRewards_userId_fkey";

-- AlterTable
ALTER TABLE "userCoins" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userQuests" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userRewards" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "userCoins" ADD CONSTRAINT "userCoins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userAccount"("AccountId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userQuests" ADD CONSTRAINT "userQuests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userAccount"("AccountId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userRewards" ADD CONSTRAINT "userRewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userAccount"("AccountId") ON DELETE SET NULL ON UPDATE CASCADE;
