/*
  Warnings:

  - You are about to drop the column `event_image_url` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "event_image_url",
ADD COLUMN     "image" TEXT;
