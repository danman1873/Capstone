/*
  Warnings:

  - The primary key for the `Coins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Quests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Rewards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coins" DROP CONSTRAINT "Coins_coinId_fkey";

-- DropForeignKey
ALTER TABLE "Quests" DROP CONSTRAINT "Quests_questId_fkey";

-- DropForeignKey
ALTER TABLE "Rewards" DROP CONSTRAINT "Rewards_rewardId_fkey";

-- AlterTable
ALTER TABLE "Coins" DROP CONSTRAINT "Coins_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "coinId" DROP NOT NULL,
ALTER COLUMN "coinId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Coins_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Coins_id_seq";

-- AlterTable
ALTER TABLE "Quests" DROP CONSTRAINT "Quests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "questId" DROP NOT NULL,
ALTER COLUMN "questId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Quests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Quests_id_seq";

-- AlterTable
ALTER TABLE "Rewards" DROP CONSTRAINT "Rewards_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "rewardId" DROP NOT NULL,
ALTER COLUMN "rewardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Rewards_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Rewards_id_seq";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_userEmail_key" ON "users"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "users_userPassword_key" ON "users"("userPassword");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coins" ADD CONSTRAINT "Coins_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quests" ADD CONSTRAINT "Quests_questId_fkey" FOREIGN KEY ("questId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rewards" ADD CONSTRAINT "Rewards_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
