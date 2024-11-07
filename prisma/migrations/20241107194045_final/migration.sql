-- AlterTable
ALTER TABLE `Post` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `refreshToken` VARCHAR(191) NULL;
