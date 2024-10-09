import { AiConfig, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { OpenAI } from 'openai';
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

const askedQuestion: RequestHandler = catchAsync(async (req, res) => {
  console.log('form api', req.file, req.files);
  try {
    // Fetch admin configuration
    const adminMessage = await AiConfigService.getSingleAiConfig();
    if (!adminMessage) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Something went wrong, please try again'
      );
    }

    // Prepare the system message
    const systemMessage: TMessage = {
      role: 'system',
      content: `
    ABOUT THIS APP : Its a application for answer user questions or researching information of Bible. You name is The Donki Ai. 
      
    Main INSTRUCTION: ${adminMessage?.instructions}
    
    About USER question: user may only provide question or include pdf query too. If you found the pdf information not related to Bible book or real please politely tell them to asked about the bible.

    UI INSTRUCTION : Ensure each response includes appropriate markdown formatting to enhance the display. Use ** for bold text, # for headers, > for quote, and - for lists etc as we are using react-markdown to render the UI similar to ChatGPT. Apply markdown where necessary to structure the content effectively. if react markdown supports other markup formatting that i did't mention but you can add to make the ui more readable then please add those markup too.
        `,
    };

    // Extract data from request
    const data = req.body as TAskedData;

    // Define the chat request parameters
    console.log(
      {
        model: getAiModelValue(adminMessage.aiModel) || 'gpt-4',
        messages: [systemMessage, ...data.conversation],
        stream: true, // Enable streaming
      },
      'form api '
    );
    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: getAiModelValue(adminMessage.aiModel) || 'gpt-4',
      messages: [systemMessage, ...data.conversation],
      stream: true, // Enable streaming
    });

    // Set response headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream the response
    for await (const part of completion) {
      const content = part.choices[0]?.delta?.content;
      if (content) {
        res.write(content);
      }
    }

    // End the streaming response
    res.end();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Error handling for OpenAI API issues
    if (error.response?.status === 429) {
      // Quota limit reached or rate limit error
      throw new ApiError(
        httpStatus.TOO_MANY_REQUESTS,
        'Quota exceeded or too many requests, please try again later.'
      );
    } else if (error.response?.status === 401) {
      // Invalid API key or authentication error
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Invalid API key or authentication failed.'
      );
    } else {
      // Handle any other errors
      console.error('OpenAI API error:', error);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'An error occurred while processing the request.'
      );
    }
  }
});

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
