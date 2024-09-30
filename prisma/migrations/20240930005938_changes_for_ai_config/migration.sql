/*
  Warnings:

  - You are about to drop the column `intractions` on the `AiConfig` table. All the data in the column will be lost.
  - You are about to drop the column `unTruthfullCount` on the `AiConfig` table. All the data in the column will be lost.
  - Added the required column `instructions` to the `AiConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unTruthfulCount` to the `AiConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AiConfig" DROP COLUMN "intractions",
DROP COLUMN "unTruthfullCount",
ADD COLUMN     "instructions" TEXT NOT NULL,
ADD COLUMN     "unTruthfulCount" INTEGER NOT NULL;
