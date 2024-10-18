-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_brandId_fkey`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
