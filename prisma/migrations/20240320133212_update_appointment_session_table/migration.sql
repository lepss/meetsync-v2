-- AlterTable
ALTER TABLE "AppointmentSession" ADD COLUMN     "iamge" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Session';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DEFAULT 'username';
