/*import { addKeyword } from '@builderbot/bot';

export const supportFlow = addKeyword(['soporte', 'contacto', 'ayuda'])
    .addAnswer(
        [
            'Si necesitas asistencia con cualquier aspecto de nuestros servicios o tienes alguna pregunta, ¡estamos aquí para ayudarte! 🙋‍♂️🙋‍♀️',
            'Puedes contactar con nosotros por:',
            '📧 Correo electrónico: support@paysat.com',
            '📞 Teléfono de atención: +44 123 456 7890',
            '💬 Chat en vivo: Si tienes una pregunta, estoy aquí para responderte de inmediato.',
            '',
            '¿Te gustaría ponerte en contacto con nuestro equipo o tienes alguna otra duda?',
            '1️⃣ Volver al menú principal',
            '0️⃣ Finalizar conversación'
        ].join('\n'),
        { capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(require('./welcomeFlow').welcomeFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(supportFlow);
        }
    );*/