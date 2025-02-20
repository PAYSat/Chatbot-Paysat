// src/flows/entitiesFlow.js
import { addKeyword } from '@builderbot/bot';
import { LLM } from '../llm/openai.js';
import { Prompts } from '../llm/prompts.js';
import { welcomeFlow } from './welcomeFlow.js';

const llm = new LLM();

export const entitiesFlow = addKeyword(['2', 'entidades', 'financieras'])
  .addAnswer(
    [
      'Aquí tienes información sobre los servicios para *Entidades Financieras*:',
      '',
      '1. 🏦 Cuentas IBAN y Tarjetas',
      '2. 💼 Servicios Corporativos',
      '3. 🔙 Volver al menú principal',
      '0. 🚪 Finalizar conversación'
    ].join('\n'),
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow }) => {
      const userMessage = ctx.body.trim().toLowerCase();

      // Interpretar el mensaje del usuario
      const interpretation = await llm.interpretMessage(userMessage);

      if (interpretation === 'opción') {
        if (userMessage === '1' || userMessage.includes('iban') || userMessage.includes('tarjetas')) {
          const infoIban = llm.getInfoFromJSON('entidades_financieras', 'cuentas_iban');
          if (infoIban) {
            await flowDynamic(infoIban.descripcion);
          }
          await flowDynamic({
            body: Prompts.getFollowUpPrompt(),
            capture: true
          });

          const followUpMessage = ctx.body.trim().toLowerCase();
          if (followUpMessage === '1') return gotoFlow(entitiesFlow);
          if (followUpMessage === '2') return gotoFlow(welcomeFlow);
          if (followUpMessage === '0') {
            await flowDynamic('¡Gracias por contactarnos! 👋');
            return;
          }
          return gotoFlow(entitiesFlow);
        }

        if (userMessage === '2' || userMessage.includes('servicios') || userMessage.includes('corporativos')) {
          const infoServicios = llm.getInfoFromJSON('entidades_financieras', 'tarjetas_corporativas');
          if (infoServicios) {
            await flowDynamic(infoServicios.descripcion);
          }
          await flowDynamic({
            body: Prompts.getFollowUpPrompt(),
            capture: true
          });

          const followUpMessage = ctx.body.trim().toLowerCase();
          if (followUpMessage === '1') return gotoFlow(entitiesFlow);
          if (followUpMessage === '2') return gotoFlow(welcomeFlow);
          if (followUpMessage === '0') {
            await flowDynamic('¡Gracias por contactarnos! 👋');
            return;
          }
          return gotoFlow(entitiesFlow);
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
