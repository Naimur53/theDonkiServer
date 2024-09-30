import { Info } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { InfoService } from './info.service';
const createInfo: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const InfoData = req.body;

    const result = await InfoService.createInfo(InfoData);
    sendResponse<Info>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Info Created successfully!',
      data: result,
    });
  }
);

const getAllInfo = catchAsync(async (req: Request, res: Response) => {
  const result = await InfoService.getAllInfo();

  sendResponse<Info>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Info retrieved successfully !',
    data: result,
  });
});

const getSingleInfo: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await InfoService.getSingleInfo();

    sendResponse<Info>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Info retrieved  successfully!',
      data: result,
    });
  }
);

const updateInfo: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await InfoService.updateInfo(id, updateAbleData);

    sendResponse<Info>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Info Updated successfully!',
      data: result,
    });
  }
);
const deleteInfo: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = '1';

    const result = await InfoService.deleteInfo(id);

    sendResponse<Info>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Info deleted successfully!',
      data: result,
    });
  }
);

export const InfoController = {
  getAllInfo,
  createInfo,
  updateInfo,
  getSingleInfo,
  deleteInfo,
};
