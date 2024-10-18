/*
  Warnings:

  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Product_brandId_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `stock`;
