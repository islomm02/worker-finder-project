/*
  Warnings:

  - Added the required column `howMuch` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Measure" AS ENUM ('HOUR', 'DAY');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "howMuch" INTEGER NOT NULL,
ADD COLUMN     "measure" "Measure" NOT NULL DEFAULT 'HOUR';
