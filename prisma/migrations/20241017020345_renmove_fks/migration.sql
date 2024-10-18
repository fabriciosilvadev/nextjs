/*
  Warnings:

  - You are about to drop the `_ProductCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductCategories` DROP FOREIGN KEY `_ProductCategories_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductCategories` DROP FOREIGN KEY `_ProductCategories_B_fkey`;

-- DropTable
DROP TABLE `_ProductCategories`;
