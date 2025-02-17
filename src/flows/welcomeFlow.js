import { addKeyword } from '@builderbot/bot';
import { usersFlow } from './usersFlow.js';
import { entitiesFlow } from './entitiesFlow.js';

export const welcomeFlow = addKeyword([
    'hola', 'hello', 'hi', 'buenos días', 'buenas tardes', 'buenas noches', 
    'qué tal', 'qué hubo', 'qué onda', 'ey', 'alo', 'saludos', 'buenas', 'epa', 'holi', 'quiubo'
])
    .addAnswer(
        [
            '¡Hola! 👋 Soy tu asistente de *PAYSAT MONEY*.',
            '',
            'te ofrecemos soluciones financieras innovadoras para simplificar tus transacciones y gestionar tus finanzas de manera eficiente. ¿Eres un usuario individual o representas a una entidad?',
            '',
            
            'Por favor, selecciona una opción:',
            '1️⃣ *Información para Personas Naturales*.',
            '2️⃣ *Información para Entidades Financieras y No Financieras*.',
            '0️⃣ *Finalizar conversación*.'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(usersFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(welcomeFlow);
        }
    );