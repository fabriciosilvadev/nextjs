/*
  Warnings:

  - You are about to drop the column `brandId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `brandId`,
    ADD COLUMN `marca_id` INTEGER NULL;

-- DropTable
DROP TABLE `Brand`;

-- CreateTable
CREATE TABLE `marca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_marca_id_fkey` FOREIGN KEY (`marca_id`) REFERENCES `marca`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
