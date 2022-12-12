/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userEmail` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_userEmail_key";

-- DropIndex
DROP INDEX "users_userName_key";

-- DropIndex
DROP INDEX "users_userPassword_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Account_id_seq";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "userEmail",
DROP COLUMN "userName",
DROP COLUMN "userPassword",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_key" ON "users"("password");
