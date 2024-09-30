/*
  Warnings:

  - Changed the type of `status` on the `Info` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EInfoStatus" AS ENUM ('info', 'warning', 'error');

-- AlterTable
ALTER TABLE "Info" DROP COLUMN "status",
ADD COLUMN     "status" "EInfoStatus" NOT NULL;

-- DropEnum
DROP TYPE "EInfoModel";
