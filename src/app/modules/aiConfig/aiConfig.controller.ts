import { AiConfig, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AiConfigService } from './aiConfig.service';
const createAiConfig: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const AiConfigData = req.body;

    const result = await AiConfigService.createAiConfig(AiConfigData);
    sendResponse<AiConfig>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AiConfig Created successfully!',
      data: result,
    });
  }
);

const getAllAiConfig = catchAsync(async (req: Request, res: Response) => {
  const result = await AiConfigService.getAllAiConfig();

  sendResponse<AiConfig>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AiConfig retrieved successfully !',
    data: result,
  });
});

const getSingleAiConfig: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AiConfigService.getSingleAiConfig();

    sendResponse<AiConfig>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AiConfig retrieved  successfully!',
      data: result,
    });
  }
);
const increaseTruthfulCount: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AiConfigService.increaseTruthfulCount();

    sendResponse<{ unTruthfulCount: number | undefined }>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Dislike added!',
      data: { unTruthfulCount: result?.unTruthfulCount },
    });
  }
);

const updateAiConfig: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await AiConfigService.updateAiConfig(id, updateAbleData);

    sendResponse<AiConfig>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AiConfig Updated successfully!',
      data: result,
    });
  }
);
const deleteAiConfig: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AiConfigService.deleteAiConfig();

    sendResponse<Prisma.BatchPayload>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AiConfig deleted successfully!',
      data: result,
    });
  }
);

export const AiConfigController = {
  getAllAiConfig,
  createAiConfig,
  updateAiConfig,
  getSingleAiConfig,
  deleteAiConfig,
  increaseTruthfulCount,
};
