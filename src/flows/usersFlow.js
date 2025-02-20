// src/flows/usersFlow.js
import { addKeyword } from '@builderbot/bot';
import { LLM } from '../llm/openai.js';
import { Prompts } from '../llm/prompts.js';
import { welcomeFlow } from './welcomeFlow.js';

const llm = new LLM();

export const usersFlow = addKeyword(['1', 'usuarios', 'personas naturales'])
  .addAnswer(
    [
      'Aquí tienes información sobre los servicios para *Personas Naturales*:',
      '',
      '1. 💳 Tarjeta VISA Recargable',
      '2. 🌍 Cuenta Bancaria Internacional (IBAN)',
      '3. 🔙 Volver al menú principal',
      '0. 🚪 Finalizar conversación'
    ].join('\n'),
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow }) => {
      const userMessage = ctx.body.trim().toLowerCase();

      // Interpretar el mensaje del usuario
      const interpretation = await llm.interpretMessage(userMessage);

      if (interpretation === 'opción') {
        if (userMessage === '1' || userMessage.includes('tarjeta') || userMessage.includes('visa')) {
          const infoTarjeta = llm.getInfoFromJSON('personas_naturales', 'tarjeta_visa');
          if (infoTarjeta) {
            await flowDynamic(infoTarjeta.descripcion);
          }
          await flowDynamic({
            body: Prompts.getFollowUpPrompt(),
            capture: true
          });

          const followUpMessage = ctx.body.trim().toLowerCase();
          if (followUpMessage === '1') return gotoFlow(usersFlow);
          if (followUpMessage === '2') return gotoFlow(welcomeFlow);
          if (followUpMessage === '0') {
            await flowDynamic('¡Gracias por contactarnos! 👋');
            return;
          }
          
          return gotoFlow(usersFlow);
        }

        if (userMessage === '2' || userMessage.includes('iban') || userMessage.includes('cuenta')) {
          const infoIban = llm.getInfoFromJSON('personas_naturales', 'cuenta_iban');
          if (infoIban) {
            await flowDynamic(infoIban.descripcion);
          }
          await flowDynamic({
            body: Prompts.getFollowUpPrompt(),
            capture: true
          });

          const followUpMessage = ctx.body.trim().toLowerCase();
          if (followUpMessage === '1') return gotoFlow(usersFlow);
          if (followUpMessage === '2') return gotoFlow(welcomeFlow);
          if (followUpMessage === '0') {
            await flowDynamic('¡Gracias por contactarnos! 👋');
            return;
          }
          
          return gotoFlow(usersFlow);
        }

        if (userMessage === '3' || userMessage.includes('volver')) {
          return gotoFlow(welcomeFlow);
        }

        if (userMessage === '0' || userMessage.includes('finalizar')) {
          await flowDynamic('¡Gracias por contactarnos! 👋');
          return;
        }
        
      }

      // Si no se entiende el mensaje, volver al menú principal
      return gotoFlow(welcomeFlow);
    }
  );