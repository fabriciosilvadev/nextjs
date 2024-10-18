/*
  Warnings:

  - You are about to drop the column `marca_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `marca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_marca_id_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `marca_id`,
    ADD COLUMN `brandId` INTEGER NULL;

-- DropTable
DROP TABLE `marca`;

-- CreateTable
CREATE TABLE `brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
