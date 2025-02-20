// src/llm/openaiClient.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Reemplaza con tu API key
});

export default openai;