/*
  Warnings:

  - The values [waring] on the enum `EInfoModel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EInfoModel_new" AS ENUM ('info', 'warning', 'error');
ALTER TABLE "Info" ALTER COLUMN "status" TYPE "EInfoModel_new" USING ("status"::text::"EInfoModel_new");
ALTER TYPE "EInfoModel" RENAME TO "EInfoModel_old";
ALTER TYPE "EInfoModel_new" RENAME TO "EInfoModel";
DROP TYPE "EInfoModel_old";
COMMIT;
