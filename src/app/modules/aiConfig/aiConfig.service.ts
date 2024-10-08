import { AiConfig, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllAiConfig = async (): Promise<AiConfig> => {
  const output = await prisma.aiConfig.findFirst();
  if (!output) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AiConfig not found!');
  }
  return output;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const askedQuestion = async (): Promise<any> => {
  const output = await prisma.aiConfig.findFirst();
  if (!output) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AiConfig not found!');
  }
  return output;
};

const createAiConfig = async (payload: AiConfig): Promise<AiConfig | null> => {
  // delete all the config
  await prisma.aiConfig.deleteMany();
  const newAiConfig = await prisma.aiConfig.create({
    data: payload,
  });
  return newAiConfig;
};

const getSingleAiConfig = async (): Promise<AiConfig | null> => {
  const result = await prisma.aiConfig.findFirst();
  return result;
};
const increaseTruthfulCount = async (): Promise<AiConfig | null> => {
  const result = await prisma.aiConfig.update({
    where: { id: '1' },
    data: { unTruthfulCount: { increment: 1 } },
  });
  return result;
};

const updateAiConfig = async (
  id: string,
  payload: Partial<AiConfig>
): Promise<AiConfig | null> => {
  const result = await prisma.aiConfig.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteAiConfig = async (): Promise<Prisma.BatchPayload | null> => {
  const result = await prisma.aiConfig.deleteMany();
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'AiConfig not found!');
  }
  return result;
};

export const AiConfigService = {
  getAllAiConfig,
  createAiConfig,
  updateAiConfig,
  getSingleAiConfig,
  deleteAiConfig,
  increaseTruthfulCount,
  askedQuestion,
};
