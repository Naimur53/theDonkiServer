import { Info } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getAllInfo = async (): Promise<Info> => {
  const total = await prisma.info.findFirst();
  if (!total) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Info not found!');
  }
  return total;
};

const createInfo = async (payload: Info): Promise<Info | null> => {
  // delete all the info
  await prisma.info.deleteMany();

  const newInfo = await prisma.info.create({
    data: payload,
  });
  return newInfo;
};

const getSingleInfo = async (): Promise<Info | null> => {
  const result = await prisma.info.findFirst();
  return result;
};

const updateInfo = async (
  id: string,
  payload: Partial<Info>
): Promise<Info | null> => {
  const result = await prisma.info.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteInfo = async (id: string): Promise<Info | null> => {
  const result = await prisma.info.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Info not found!');
  }
  return result;
};

export const InfoService = {
  getAllInfo,
  createInfo,
  updateInfo,
  getSingleInfo,
  deleteInfo,
};
