/*
  Warnings:

  - You are about to drop the `userAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userCoins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userQuests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userRewards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userCoins" DROP CONSTRAINT "userCoins_userId_fkey";

-- DropForeignKey
ALTER TABLE "userQuests" DROP CONSTRAINT "userQuests_userId_fkey";

-- DropForeignKey
ALTER TABLE "userRewards" DROP CONSTRAINT "userRewards_userId_fkey";

-- DropTable
DROP TABLE "userAccount";

-- DropTable
DROP TABLE "userCoins";

-- DropTable
DROP TABLE "userQuests";

-- DropTable
DROP TABLE "userRewards";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coins" (
    "id" SERIAL NOT NULL,
    "userCoinTotal" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Coins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quests" (
    "id" SERIAL NOT NULL,
    "quests" TEXT NOT NULL,
    "questCoinWorth" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Quests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rewards" (
    "id" SERIAL NOT NULL,
    "rewards" TEXT NOT NULL,
    "rewardCoinCost" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPassword_key" ON "User"("userPassword");

-- CreateIndex
CREATE UNIQUE INDEX "Coins_userId_key" ON "Coins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Quests_userId_key" ON "Quests"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Rewards_userId_key" ON "Rewards"("userId");

-- AddForeignKey
ALTER TABLE "Coins" ADD CONSTRAINT "Coins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quests" ADD CONSTRAINT "Quests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
