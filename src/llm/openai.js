import fs from 'fs';
import openai from './openaiClient.js';
import { Prompts } from './prompts.js';

const personasNaturales = JSON.parse(fs.readFileSync('./src/llm/jsonInfo/personas_naturales.json', 'utf8'));
const entidadesFinancieras = JSON.parse(fs.readFileSync('./src/llm/jsonInfo/entidades_financieras.json', 'utf8'));

export class LLM {
  async interpretMessage(userMessage) {
    const prompt = Prompts.getInterpretationPrompt(userMessage);
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 10,
    });
    return response.choices[0].message.content.trim().toLowerCase();
  }

  async generateResponse(userMessage, context) {
    const prompt = Prompts.getResponsePrompt(userMessage, context);
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });
    return response.choices[0].message.content.trim();
  }

  getInfoFromJSON(categoria, subcategoria) {
    if (categoria === 'personas_naturales') {
      return personasNaturales[subcategoria];
    } else if (categoria === 'entidades_financieras') {
      return entidadesFinancieras[subcategoria];
    }
    return null;
  }
}
