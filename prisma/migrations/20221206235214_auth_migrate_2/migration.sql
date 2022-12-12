/*
  Warnings:

  - You are about to drop the column `session_token` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionToken` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_user_id_fkey";

-- DropIndex
DROP INDEX "Session_session_token_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "session_token",
DROP COLUMN "user_id",
ADD COLUMN     "sessionToken" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
