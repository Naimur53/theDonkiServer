import { EAiModel } from '@prisma/client';
const getAiModelValue = (model: EAiModel): string => {
  switch (model) {
    case EAiModel.GPT_4:
      return 'gpt-4';
    case EAiModel.GPT_4_TURBO:
      return 'gpt-4-turbo';
    case EAiModel.GPT_3_5_TURBO:
      return 'gpt-3.5-turbo';
    default:
      return 'gpt-3.5-turbo';
  }
};

export default getAiModelValue;
