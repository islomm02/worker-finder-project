/*
  Warnings:

  - You are about to drop the column `toolId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `toolQuantity` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telegramUserName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_toolId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "toolId",
DROP COLUMN "toolQuantity";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "OrderTools" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "toolQuantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "OrderTools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderTools" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderTools_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderTools_B_index" ON "_OrderTools"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramUserName_key" ON "User"("telegramUserName");

-- AddForeignKey
ALTER TABLE "OrderTools" ADD CONSTRAINT "OrderTools_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderTools" ADD CONSTRAINT "OrderTools_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderTools" ADD CONSTRAINT "_OrderTools_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderTools" ADD CONSTRAINT "_OrderTools_B_fkey" FOREIGN KEY ("B") REFERENCES "Tools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
