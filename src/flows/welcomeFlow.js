import { addKeyword } from '@builderbot/bot';
import { LLM } from '../llm/openai.js';
import { Prompts } from '../llm/prompts.js';
import { usersFlow } from './usersFlow.js';
import { entitiesFlow } from './entitiesFlow.js';

const llm = new LLM();

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
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow }) => {
      const userMessage = ctx.body.trim();

      // Generamos el prompt para interpretación
      const interpretationPrompt = Prompts.getInterpretationPrompt(userMessage);
      const interpretation = await llm.interpretMessage(interpretationPrompt);

      if (interpretation === 'saludo') {
        await flowDynamic(Prompts.getWelcomePrompt());
        return;
      }

      if (interpretation === 'opción') {
        const normalizedMessage = userMessage.toLowerCase();

        if (normalizedMessage.includes('1') || normalizedMessage.includes('persona') || normalizedMessage.includes('naturales')) {
          return gotoFlow(usersFlow);
        }
        if (normalizedMessage.includes('2') || normalizedMessage.includes('entidad') || normalizedMessage.includes('financieras')) {
          return gotoFlow(entitiesFlow);
        }
        if (normalizedMessage.includes('0') || normalizedMessage.includes('finalizar') || normalizedMessage.includes('salir')) {
          await flowDynamic('¡Gracias por contactarnos! 👋');
          return;
        }
      }

      // Si el mensaje no es válido, mostrar opciones nuevamente
      await flowDynamic([
        'No entendí tu respuesta. 😕',
        'Por favor, selecciona una opción válida:',
        '1️⃣ *Información para Personas Naturales*.',
        '2️⃣ *Información para Entidades Financieras y No Financieras*.',
        '0️⃣ *Finalizar conversación*.'
      ].join('\n'));
    }
  );
