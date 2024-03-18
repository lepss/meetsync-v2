/*
  Warnings:

  - You are about to drop the column `fisrtname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fisrtname",
ADD COLUMN     "firstname" TEXT;
