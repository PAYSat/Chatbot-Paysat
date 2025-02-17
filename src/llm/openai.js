import openai from './openaiClient.js';
import { getPrompt } from './prompts.js'

//funcion para enviar la peticion a OPENAI

export async function getLLMResponse(userMesssge, currentFlow) {

    const prompt = await getPrompt(userMesssge, currentFlow); // Obtén el prompt según el flujo y el mensaje del usuario

    try {

        const response = await openai.createCompletion({
            model: 'gpt-4o-mini', //modelo del gpt que estemos usando
            prompt: prompt,
            max_tokens: 150, // Ajusta según la longitud de respuesta que desees
            temperature: 0.7,
        });

        return response.data.choices[0].text.trim(); // Devuelve la respuesta de OpenAI
    } catch (error) {
        console.error('Error obteniendo respuesta de OpenAI:', error);
        return 'Lo siento, hubo un problema al procesar tu solicitud.';
    }
}
