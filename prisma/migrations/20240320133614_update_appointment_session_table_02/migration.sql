/*
  Warnings:

  - You are about to drop the column `iamge` on the `AppointmentSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AppointmentSession" DROP COLUMN "iamge",
ADD COLUMN     "image" TEXT;
