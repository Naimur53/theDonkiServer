import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import httpStatus from 'http-status';
import pdf from 'pdf-parse';
import ApiError from '../../errors/ApiError';
import { TAskedData, TMessage } from './../modules/aiConfig/aiConfig.interface';

// Function to extract text from PDF
const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  const data = await pdf(buffer);
  return data.text;
};

// Middleware to handle file upload and extract PDF content
const uploadPdfFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log({ body: req.body });
  req.body = {
    conversation: JSON.parse(req.body.conversation) as TMessage[],
    // question: req.body.question,
  };
  //   upload(req, res, async err => {
  //     if (err) {
  //       console.log(err);
  //       throw new ApiError(httpStatus.BAD_REQUEST, 'File upload failed');
  //     }
  // Check if a PDF file is uploaded
  console.log({ mid: req.files, ai: req.file });
  if (Array.isArray(req.files)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You can only upload one pdf at a time'
    );
  }

  if (req.files && req.files.pdf) {
    const mainFile = req.files.pdf as UploadedFile;

    try {
      // Extract text from the PDF file
      const pdfText = await extractTextFromPDF(mainFile?.data);
      if (pdfText) {
        console.log({ pdfText });
        // Update request body with extracted text
        const conversation = req.body.conversation as TMessage[];
        conversation[conversation.length - 1] = {
          role: 'user',
          content: `
                          PDF FILE CONTENT : ${pdfText}
                          
                          USER QUERY : ${
                            conversation[conversation.length - 1].content
                          }
                          `,
        };
        console.log({ conversation });
        req.body = {
          ...req.body,
          conversation,
        } as TAskedData;
      }
      // Add extracted text to request body
    } catch (error) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to extract PDF content'
      );
    }
  }

  next();
  //   });
};

export default uploadPdfFile;
