-- CreateEnum
CREATE TYPE "EAiModel" AS ENUM ('GPT_4', 'GPT_4_TURBO', 'GPT_3_5_TURBO');

-- CreateEnum
CREATE TYPE "EInfoModel" AS ENUM ('info', 'waring', 'error');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL DEFAULT '1',
    "faildAttempts" INTEGER NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiConfig" (
    "id" TEXT NOT NULL DEFAULT '1',
    "aiModel" "EAiModel" NOT NULL,
    "intractions" TEXT NOT NULL,
    "unTruthfullCount" INTEGER NOT NULL,

    CONSTRAINT "AiConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Info" (
    "id" TEXT NOT NULL DEFAULT '1',
    "status" "EInfoModel" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
