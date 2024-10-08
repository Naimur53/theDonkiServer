export type IAiConfigFilters = {
  searchTerm?: string;
};
export type TMessage = {
  role: 'system' | 'user' | 'assistant'; // The role in the conversation
  content: string; // The message content
};

export type TAskedData = {
  conversation: TMessage[]; // An array of conversation messages
  question: string; // The query
  model?: string; // Optional model field (e.g., 'gpt-3.5-turbo')
};
