import { OpenAI } from 'openai';
import { getPrompt } from '../prompts.js'; // Importar la función para generar prompts

// Configuración de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // API key de OpenAI (debe estar en el archivo .env)
});

/**
 * Genera una respuesta usando GPT-4 basada en el mensaje del usuario.
 * @param {string} userMessage - Mensaje del usuario.
 * @returns {Promise<string>} - Respuesta generada por GPT-4.
 */
export async function generateResponse(userMessage) {
    // Obtener el prompt con el contexto y la información de los PDFs
    const prompt = await getPrompt(userMessage);

    // Generar la respuesta usando GPT-4
    const response = await openai.chat.completions.create({
        model: 'gpt-4', // O 'gpt-4-mini' si es el modelo que estás utilizando
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500, // Límite de tokens para la respuesta
    });

    return response.choices[0].message.content;
}