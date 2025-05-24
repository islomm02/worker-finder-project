/*
  Warnings:

  - You are about to drop the column `answer` on the `FAQ` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name_uz]` on the table `Capacity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_ru]` on the table `Capacity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_en]` on the table `Capacity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_uz]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_ru]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_en]` on the table `Partners` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FAQ" DROP COLUMN "answer";

-- CreateTable
CREATE TABLE "Contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_name_uz_key" ON "Capacity"("name_uz");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_name_ru_key" ON "Capacity"("name_ru");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_name_en_key" ON "Capacity"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_name_uz_key" ON "Partners"("name_uz");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_name_ru_key" ON "Partners"("name_ru");

-- CreateIndex
CREATE UNIQUE INDEX "Partners_name_en_key" ON "Partners"("name_en");
