/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `AiConfig` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Info` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AiConfig" ALTER COLUMN "unTruthfulCount" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AiConfig_id_key" ON "AiConfig"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Info_id_key" ON "Info"("id");
