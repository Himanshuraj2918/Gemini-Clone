// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log(apiKey);
if (!apiKey) {
  throw new Error('API key is not set. Please set the VITE_API_KEY environment variable.');
}async function generateContentStream(prompt) {
  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });
  const config = {
    responseMimeType: 'text/plain', // Keep this for text output
  };
  const model = 'gemini-1.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let data= "";
  for await (const chunk of response) {
    console.log(chunk.text);
    data += chunk.text;
  }
  return data;
}

export default generateContentStream;
