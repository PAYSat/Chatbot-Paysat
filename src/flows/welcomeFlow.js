import { addKeyword } from '@builderbot/bot';
import { generateResponse } from '../llm/models/gpt-4-mini.js';

export const welcomeFlow = addKeyword([])
    .addAnswer(
        [
            '¡Hola! 👋 Soy tu asistente de *PAYSAT MONEY*.',
            '',
            'Te ofrecemos soluciones financieras innovadoras para simplificar tus transacciones y gestionar tus finanzas de manera eficiente. ¿Eres un usuario individual o representas a una entidad?',
            '',
            'Por favor, selecciona una opción:',
            '1️⃣ *Información para Personas Naturales*.',
            '2️⃣ *Información para Entidades Financieras y No Financieras*.',
            '0️⃣ *Finalizar conversación*.'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { endFlow }) => {
            const userMessage = ctx.body.trim();

            if (userMessage === '1' || userMessage === '2' || userMessage === '0') {
                if (userMessage === '0') {
                    return endFlow('¡Gracias por contactarnos! 👋');
                } else {
                    const response = await generateResponse(
                        userMessage === '1' 
                            ? 'Dame información para personas naturales.' 
                            : 'Dame información para entidades financieras y no financieras.'
                    );
                    return endFlow(response);
                }
            } else {
                const isGreeting = await checkIfGreeting(userMessage);
                if (isGreeting) {
                    return endFlow('¡Hola! 👋 ¿En qué puedo ayudarte hoy?');
                } else {
                    const response = await generateResponse(userMessage);
                    return endFlow(response);
                }
            }
        }
    );

async function checkIfGreeting(userMessage) {
    const prompt = `El siguiente mensaje es de un usuario. Determina si es un saludo o no. Responde solo con "Sí" o "No". Mensaje: "${userMessage}"`;
    const response = await generateResponse(prompt);
    return response.trim().toLowerCase() === 'sí';
}