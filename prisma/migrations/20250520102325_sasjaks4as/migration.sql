/*
  Warnings:

  - Added the required column `Oked` to the `AboutCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `AboutCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank` to the `AboutCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inn` to the `AboutCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mfo` to the `AboutCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pc` to the `AboutCompany` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AboutCompany" ADD COLUMN     "Oked" TEXT NOT NULL,
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "bank" TEXT NOT NULL,
ADD COLUMN     "inn" TEXT NOT NULL,
ADD COLUMN     "mfo" TEXT NOT NULL,
ADD COLUMN     "pc" TEXT NOT NULL;
