import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const sendMessageToOpenAI = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Ошибка при отправке сообщения в OpenAI:', error);
    throw error;
  }
};