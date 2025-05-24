/*
  Warnings:

  - You are about to drop the column `toolId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_OrderProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderProducts" DROP CONSTRAINT "_OrderProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderProducts" DROP CONSTRAINT "_OrderProducts_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "toolId";

-- DropTable
DROP TABLE "_OrderProducts";

-- CreateTable
CREATE TABLE "_OrderItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderItems_B_index" ON "_OrderItems"("B");

-- AddForeignKey
ALTER TABLE "_OrderItems" ADD CONSTRAINT "_OrderItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderItems" ADD CONSTRAINT "_OrderItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
