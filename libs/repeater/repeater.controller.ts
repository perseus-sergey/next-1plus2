'use server';

import { ETaskType } from '@/components/Repeater/DictionaryPage';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

// limit of inputs type=number
// add transcription
// add button remove all phrases

export const generateAiText = async ({
  level,
  quantity,
  type,
  topic,
}: {
  level: number;
  quantity: number;
  type: ETaskType;
  topic: string;
}) => {
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2000,
    responseMimeType: 'text/plain',
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  const prompt = `Level: ${level}; Number of tasks: ${quantity}; Type: ${type}; Topic: ${topic || 'general'}`;

  // const prompt = `Level: 5; Number of tasks: 10; Type: 'Phrases'; Topic: School`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig,
      safetySettings,
      systemInstruction: `
You are an English teacher.
Your task is to generate exercises for students according to the following criteria:
- Difficulty level: from 1 to 10
- Number of tasks: from 1 to 70
- Type of tasks: ["phrases", "words", "sentences"]
- Topic
Each type of task has specific word count requirements:
  - "words" must contain up to 2 words
  - "phrases" must contain up to 4 words and should not end with a period
  - "sentences" must contain up to 11 words
Create complete tasks (do not use "...").
Each task must include:
- The English sentence/phrase
- The phonetic transcription of the English sentence/phrase/words
- The Ukrainian translation
Format the tasks as JSON in the following format:
{
  "lessons": [
    ["English phrase", "English transcription", "Український переклад"],
    ["English phrase 2", "English transcription 2", "Український переклад 2"]
  ]
}`,
    });

    const result = await model.generateContent(prompt);

    const { response } = result;
    const cleanResult = response.text().replace(/```json|```/g, '');

    const jsonParsed = await JSON.parse(cleanResult);

    const { lessons } = jsonParsed as { lessons: string[][] };
    return lessons || null;
  } catch (error) {
    console.log(error instanceof Error ? error : new Error('Wrong AI generation of JSON parsing'));
    return null;
  }
};
