'use server';

import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { IGenerateAiSettings, promptModel } from './repeater.model';

const {
  maxLevel,
  maxTaskGeneration,
  defaultTopic,
  defaultTaskType,
  maxWordsInPhrases,
  maxWordsInSentences,
  maxWordsInWords,
} = promptModel;

export const generateAiText = async ({
  level,
  quantity,
  taskType,
  topic,
  languageAnswer = 'English',
  languageAsk = 'Ukrainian',
}: IGenerateAiSettings) => {
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

  const systemInstruction = `You are a teacher of language: ${languageAnswer}.
Your task is to generate exercises for students according to the following criteria:
- Difficulty level: from 1 (easy) to ${maxLevel} (hard)
- Number of tasks: from 1 to ${maxTaskGeneration}
- Type of tasks: ["phrases", "words", "sentences"]
- Topic
Each type of task has specific word count requirements:
  - "words" must contain up to ${maxWordsInWords} words
  - "phrases" must contain up to ${maxWordsInPhrases} words and should not end with a period
  - "sentences" must contain up to ${maxWordsInSentences} words
Create complete tasks (do not use "...").
Each task must include:
- The ${languageAnswer} sentence/phrase
- The phonetic transcription of the ${languageAnswer} sentence/phrase/words
- The ${languageAsk} translation
Format the tasks as JSON in the following format:
{
  "lessons": [
    ["${languageAnswer} phrase", "${languageAnswer} transcription", "${languageAsk} translation"],
    ["${languageAnswer} phrase 2", "${languageAnswer} transcription 2", "${languageAsk} translation 2"]
  ]
}`;
  const prompt = `Level: ${Math.min(level, maxLevel)}; Number of tasks: ${Math.min(quantity, maxTaskGeneration)}; Type: ${taskType || defaultTaskType}; Topic: ${topic || defaultTopic}`;
  // const prompt = `Level: 5; Number of tasks: 10; Type: 'Phrases'; Topic: School`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig,
      safetySettings,
      systemInstruction,
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
