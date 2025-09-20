/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('BOOKING', 'SECURITY_DEPOSIT', 'EXTRA_CHARGES', 'REFUND');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zipCode" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."VehicleCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "model" TEXT,
    "brand" TEXT,
    "year" INTEGER,
    "color" TEXT,
    "images" JSONB,
    "primaryImage" TEXT,
    "pricePerDay" DOUBLE PRECISION NOT NULL,
    "includedKm" INTEGER NOT NULL DEFAULT 0,
    "extraKmRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fuelType" TEXT,
    "engineCapacity" TEXT,
    "mileage" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VehicleLocation" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "totalPricing" DOUBLE PRECISION NOT NULL,
    "securityDeposit" DOUBLE PRECISION,
    "extraCharges" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "pickupLocation" TEXT,
    "dropoffLocation" TEXT,
    "specialRequests" TEXT,
    "actualStartTime" TIMESTAMP(3),
    "actualEndTime" TIMESTAMP(3),
    "totalKmRidden" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "type" "public"."PaymentType" NOT NULL DEFAULT 'BOOKING',
    "gatewayResponse" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleCategory_name_key" ON "public"."VehicleCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "public"."Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_number_key" ON "public"."Vehicle"("number");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleLocation_vehicleId_locationId_key" ON "public"."VehicleLocation"("vehicleId", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingNumber_key" ON "public"."Booking"("bookingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_bookingId_key" ON "public"."Review"("userId", "bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "public"."settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."VehicleCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VehicleLocation" ADD CONSTRAINT "VehicleLocation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VehicleLocation" ADD CONSTRAINT "VehicleLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "public"."Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
