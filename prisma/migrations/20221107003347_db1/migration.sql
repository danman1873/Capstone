-- CreateTable
CREATE TABLE "userAccount" (
    "AccountId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,

    CONSTRAINT "userAccount_pkey" PRIMARY KEY ("AccountId")
);

-- CreateTable
CREATE TABLE "userCoins" (
    "id" SERIAL NOT NULL,
    "userCoinTotal" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userCoins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userQuests" (
    "id" SERIAL NOT NULL,
    "quests" TEXT NOT NULL,
    "questCoinWorth" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userQuests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userRewards" (
    "id" SERIAL NOT NULL,
    "rewards" TEXT NOT NULL,
    "rewardCoinCost" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userRewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAccount_userName_key" ON "userAccount"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "userAccount_userEmail_key" ON "userAccount"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "userAccount_userPassword_key" ON "userAccount"("userPassword");

-- AddForeignKey
ALTER TABLE "userCoins" ADD CONSTRAINT "userCoins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userAccount"("AccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userQuests" ADD CONSTRAINT "userQuests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userAccount"("AccountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userRewards" ADD CONSTRAINT "userRewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userAccount"("AccountId") ON DELETE RESTRICT ON UPDATE CASCADE;
