/*
  Warnings:

  - You are about to drop the column `actualEndTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `actualStartTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookingNumber` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `dropoffLocation` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `extraCharges` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pickupLocation` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `securityDeposit` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequests` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalKmRidden` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalPricing` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `engineCapacity` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `extraKmRate` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `fuelType` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `includedKm` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `mileage` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `primaryImage` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to alter the column `pricePerDay` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `createdAt` on the `VehicleLocation` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `VehicleLocation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VehicleLocation` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VehicleCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `settings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenFingerprint` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `imageUrl` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `includedKmFor2Days` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `includedKmPerDay` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriceFor2Days` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleTypeId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `VehicleLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vehicle" DROP CONSTRAINT "Vehicle_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."VehicleLocation" DROP CONSTRAINT "VehicleLocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."VehicleLocation" DROP CONSTRAINT "VehicleLocation_vehicleId_fkey";

-- DropIndex
DROP INDEX "public"."Booking_bookingNumber_key";

-- DropIndex
DROP INDEX "public"."VehicleLocation_vehicleId_locationId_key";

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "actualEndTime",
DROP COLUMN "actualStartTime",
DROP COLUMN "bookingNumber",
DROP COLUMN "dropoffLocation",
DROP COLUMN "extraCharges",
DROP COLUMN "locationId",
DROP COLUMN "pickupLocation",
DROP COLUMN "securityDeposit",
DROP COLUMN "specialRequests",
DROP COLUMN "totalKmRidden",
DROP COLUMN "totalPricing",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "public"."RefreshToken" ADD COLUMN     "tokenFingerprint" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Vehicle" DROP COLUMN "brand",
DROP COLUMN "categoryId",
DROP COLUMN "color",
DROP COLUMN "engineCapacity",
DROP COLUMN "extraKmRate",
DROP COLUMN "fuelType",
DROP COLUMN "images",
DROP COLUMN "includedKm",
DROP COLUMN "isActive",
DROP COLUMN "isAvailable",
DROP COLUMN "mileage",
DROP COLUMN "model",
DROP COLUMN "primaryImage",
DROP COLUMN "year",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "includedKmFor2Days" INTEGER NOT NULL,
ADD COLUMN     "includedKmPerDay" INTEGER NOT NULL,
ADD COLUMN     "totalPriceFor2Days" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "vehicleTypeId" TEXT NOT NULL,
ALTER COLUMN "pricePerDay" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "public"."VehicleLocation" DROP COLUMN "createdAt",
DROP COLUMN "locationId",
DROP COLUMN "updatedAt",
ADD COLUMN     "location" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Location";

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."Review";

-- DropTable
DROP TABLE "public"."VehicleCategory";

-- DropTable
DROP TABLE "public"."settings";

-- DropEnum
DROP TYPE "public"."PaymentStatus";

-- DropEnum
DROP TYPE "public"."PaymentType";

-- CreateTable
CREATE TABLE "public"."VehicleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "public"."VehicleType"("name");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "public"."Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_vehicleId_idx" ON "public"."Booking"("vehicleId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "public"."Booking"("status");

-- CreateIndex
CREATE INDEX "Vehicle_vehicleTypeId_idx" ON "public"."Vehicle"("vehicleTypeId");

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "public"."VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VehicleLocation" ADD CONSTRAINT "VehicleLocation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
