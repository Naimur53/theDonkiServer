import { AiConfig, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { OpenAI } from 'openai';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import getAiModelValue from '../../../helpers/getModelByEnum';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TAskedData, TMessage } from './aiConfig.interface';
import { AiConfigService } from './aiConfig.service';
const openai = new OpenAI({
  apiKey: config.openAiApi, // Load API key from .env
});
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
const askedQuestion: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const adminMessage = await AiConfigService.getSingleAiConfig();
    if (!adminMessage) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Something went wrong please try again'
      );
    }
    const systemMessage: TMessage = {
      role: 'system',
      content: ` 
        ${adminMessage?.instructions}
         
        Finally for each response you should add format  e.g., ** for bold, # for headers, etc.

        `,
    };
    const data = req.body as TAskedData;
    const info: ChatCompletionCreateParamsBase = {
      model: getAiModelValue(adminMessage.aiModel) || 'gpt-4',

      messages: [systemMessage, ...data.conversation],
      stream: true, // Enable streaming
    };
    console.log(info);
    const completion = await openai.chat.completions.create({
      model: getAiModelValue(adminMessage.aiModel) || 'gpt-4',

      messages: [systemMessage, ...data.conversation],
      stream: true, // Enable streaming
    });
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const part of completion) {
      const content = part.choices[0]?.delta?.content;

      if (content) {
        res.write(content);
      }
    }

    res.end();
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
  askedQuestion,
};
