import { addKeyword } from '@builderbot/bot';

export const entitiesFlow = addKeyword(['2', 'entidades', 'financieras'])
    .addAnswer(
        [
            '¡Perfecto! 👋 Aquí tienes información para *Entidades Financieras y No Financieras*:',
            '',
            '1. 💳 *Emisión de Tarjetas VISA (Débito y Crédito)*: Ofrece tarjetas a tus clientes.',
            '2. 🌍 *Cuentas IBAN Multidivisa*: Gestiona cuentas bancarias internacionales.',
            '3. 💸 *Pagos Transfronterizos*: Simplifica los pagos internacionales.',
            '4. 📜 *Cumplimiento Normativo (KYC/AML)*: Cumple con regulaciones internacionales.',
            '5. 🛠️ *Plataforma de Gestión Integrada*: Accede a herramientas avanzadas para administrar tus servicios.',
            '6. 🔙 *Volver al menú principal*.',
            '0. 🚪 *Finalizar conversación*.'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(tarjetaEntitiesFlow);
            if (option === '2') return gotoFlow(ibanEntitiesFlow);
            if (option === '3') return gotoFlow(pagosEntitiesFlow);
            if (option === '4') return gotoFlow(complianceFlow);
            if (option === '5') return gotoFlow(plataformaFlow);
            if (option === '6') return gotoFlow(require('./welcomeFlow').welcomeFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Opción No Disponible
const opcionNoDisponibleFlow = addKeyword(['opcion no disponible'])
    .addAnswer(
        [
            '❌ *Lo siento, esta opción aún no está disponible.* ❌',
            '',
            '¿Qué te gustaría hacer?',
            '1. 🔙 *Volver al menú anterior*',
            '2. 🏠 *Volver al menú principal*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow, fallBack }) => {
            const option = ctx.body.trim();
            if (option === '1') return fallBack(); // Vuelve al flujo anterior
            if (option === '2') return gotoFlow(require('./welcomeFlow').welcomeFlow); // Vuelve al menú principal
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋'); // Finaliza la conversación
            return gotoFlow(opcionNoDisponibleFlow); // Si la opción no es válida, repetir el flujo
        }
    );

// Flujo de Emisión de Tarjetas VISA para Entidades
const tarjetaEntitiesFlow = addKeyword(['tarjeta', 'visa', 'emisión tarjetas'])
    .addAnswer(
        [
            '💳 *Emisión de Tarjetas VISA (Débito y Crédito)* 💳',
            '',
            'Con PAYSAT MONEY, puedes ofrecer tarjetas VISA a tus clientes con las siguientes ventajas:',
            '',
            '🌍 *Alcance global*: Tarjetas válidas en cualquier parte del mundo.',
            '💼 *Flexibilidad*: Emite tarjetas físicas o virtuales según las necesidades de tus clientes.',
            '🔒 *Seguridad avanzada*: Protección contra fraudes y cumplimiento normativo.',
            '💵 *Recargas flexibles*: Opciones de recarga mediante transferencias bancarias, criptomonedas y más.',
            '',
            '¿Te gustaría saber más sobre cómo emitir tarjetas o las opciones disponibles?',
            '1. 📥 *Cómo emitir tarjetas*',
            '2. 💰 *Opciones de recarga y gestión*',
            '3. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(emitirTarjetasFlow);
            if (option === '2') return gotoFlow(recargaEntitiesFlow);
            if (option === '3') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cómo Emitir Tarjetas
const emitirTarjetasFlow = addKeyword(['emitir tarjetas'])
    .addAnswer(
        [
            '📥 *Cómo emitir tarjetas VISA* 📥',
            '',
            'El proceso de emisión de tarjetas es sencillo:',
            '',
            '1. 📝 Regístrate como entidad en nuestra plataforma.',
            '2. 📦 Solicita la emisión de tarjetas físicas o virtuales para tus clientes.',
            '3. 🚀 Recibe las tarjetas y distribúyelas a tus clientes.',
            '',
            '¿Necesitas ayuda con el registro o la emisión de tarjetas?',
            '1. 🔙 *Volver al menú de tarjetas*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(tarjetaEntitiesFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Opciones de Recarga y Gestión para Entidades
const recargaEntitiesFlow = addKeyword(['recarga', 'gestión'])
    .addAnswer(
        [
            '💰 *Opciones de Recarga y Gestión* 💰',
            '',
            'Ofrece a tus clientes múltiples opciones de recarga para sus tarjetas:',
            '',
            '🏦 Transferencias bancarias.',
            '💳 Tarjetas de crédito o débito.',
            '₿ Criptomonedas.',
            '🏪 Puntos de pago autorizados.',
            '',
            'Además, nuestra plataforma te permite gestionar las tarjetas de tus clientes de manera eficiente.',
            '',
            '¿Necesitas más detalles sobre estas opciones?',
            '1. 🔙 *Volver al menú de tarjetas*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(tarjetaEntitiesFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cuentas IBAN Multidivisa para Entidades
const ibanEntitiesFlow = addKeyword(['iban', 'cuentas bancarias'])
    .addAnswer(
        [
            '🌍 *Cuentas IBAN Multidivisa* 🌍',
            '',
            'Con nuestras cuentas IBAN, puedes ofrecer a tus clientes:',
            '',
            '💱 Manejo de múltiples monedas en una sola cuenta.',
            '💸 Transferencias internacionales rápidas y económicas.',
            '🚀 Compatibilidad con pagos SEPA y SWIFT.',
            '',
            '¿Te gustaría saber cómo obtener cuentas IBAN para tus clientes o conocer sus ventajas?',
            '1. 📥 *Cómo obtener cuentas IBAN*',
            '2. ✅ *Ventajas de las cuentas IBAN*',
            '3. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(obtenerIBANEntitiesFlow);
            if (option === '2') return gotoFlow(ventajasIBANEntitiesFlow);
            if (option === '3') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cómo Obtener Cuentas IBAN para Entidades
const obtenerIBANEntitiesFlow = addKeyword(['obtener iban'])
    .addAnswer(
        [
            '📥 *Cómo obtener cuentas IBAN* 📥',
            '',
            'El proceso para obtener cuentas IBAN es sencillo:',
            '',
            '1. 📝 Regístrate como entidad en nuestra plataforma.',
            '2. 📦 Solicita la apertura de cuentas IBAN para tus clientes.',
            '3. 🚀 Recibe los datos de las cuentas en minutos.',
            '',
            '¿Necesitas ayuda con el registro o la apertura de cuentas?',
            '1. 🔙 *Volver al menú de cuentas IBAN*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(ibanEntitiesFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Ventajas de las Cuentas IBAN para Entidades
const ventajasIBANEntitiesFlow = addKeyword(['ventajas iban'])
    .addAnswer(
        [
            '✅ *Ventajas de las cuentas IBAN* ✅',
            '',
            'Las cuentas IBAN de PAYSAT MONEY ofrecen:',
            '',
            '🌍 Acceso global: Realiza pagos y transferencias en múltiples monedas.',
            '💼 Facilidad de uso: Gestiona las cuentas de tus clientes desde una sola plataforma.',
            '🔒 Seguridad avanzada: Protección contra fraudes y cumplimiento normativo.',
            '',
            '¿Quieres saber más sobre cómo obtener cuentas IBAN?',
            '1. 🔙 *Volver al menú de cuentas IBAN*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(ibanEntitiesFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Pagos Transfronterizos para Entidades
const pagosEntitiesFlow = addKeyword(['pagos', 'transfronterizos'])
    .addAnswer(
        [
            '💸 *Pagos Transfronterizos* 💸',
            '',
            'Simplifica los pagos internacionales para tus clientes con nuestras soluciones:',
            '',
            '🌍 Envía y recibe dinero en más de 150 monedas.',
            '💼 Tarifas competitivas y tiempos de liquidación rápidos.',
            '🚀 Compatibilidad con pagos SEPA y SWIFT.',
            '',
            '¿Te gustaría saber más sobre cómo implementar estos pagos?',
            '1. 📥 *Cómo implementar pagos transfronterizos*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(implementarPagosFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cómo Implementar Pagos Transfronterizos
const implementarPagosFlow = addKeyword(['implementar pagos'])
    .addAnswer(
        [
            '📥 *Cómo implementar pagos transfronterizos* 📥',
            '',
            'El proceso para implementar pagos transfronterizos es sencillo:',
            '',
            '1. 📝 Regístrate como entidad en nuestra plataforma.',
            '2. 🛠️ Configura los servicios de pagos internacionales para tus clientes.',
            '3. 🚀 Comienza a enviar y recibir pagos en minutos.',
            '',
            '¿Necesitas ayuda con el registro o la configuración?',
            '1. 🔙 *Volver al menú de pagos*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(pagosEntitiesFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cumplimiento Normativo (KYC/AML)
const complianceFlow = addKeyword(['cumplimiento', 'kyc', 'aml'])
    .addAnswer(
        [
            '📜 *Cumplimiento Normativo (KYC/AML)* 📜',
            '',
            'En PAYSAT MONEY, te ayudamos a cumplir con las regulaciones internacionales:',
            '',
            '🔍 Verificación de identidad (KYC) para tus clientes.',
            '🚫 Prevención de lavado de dinero (AML) con herramientas avanzadas.',
            '🌍 Cumplimiento con normativas como PSD2 y GDPR.',
            '',
            '¿Te gustaría saber más sobre cómo implementar estas soluciones?',
            '1. 📥 *Cómo implementar KYC/AML*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(implementarComplianceFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cómo Implementar Cumplimiento Normativo
const implementarComplianceFlow = addKeyword(['implementar kyc', 'implementar aml'])
    .addAnswer(
        [
            '📥 *Cómo implementar KYC/AML* 📥',
            '',
            'El proceso para implementar soluciones de cumplimiento normativo es sencillo:',
            '',
            '1. 📝 Regístrate como entidad en nuestra plataforma.',
            '2. 🛠️ Configura las herramientas de KYC/AML para tus clientes.',
            '3. 🚀 Comienza a verificar y monitorear transacciones en minutos.',
            '',
            '¿Necesitas ayuda con el registro o la configuración?',
            '1. 🔙 *Volver al menú de cumplimiento*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(complianceFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Plataforma de Gestión Integrada
const plataformaFlow = addKeyword(['plataforma', 'gestión'])
    .addAnswer(
        [
            '🛠️ *Plataforma de Gestión Integrada* 🛠️',
            '',
            'Accede a herramientas avanzadas para administrar tus servicios:',
            '',
            '📊 Panel de control para gestionar tarjetas, cuentas IBAN y pagos.',
            '🔒 Seguridad avanzada con monitoreo en tiempo real.',
            '📜 Cumplimiento normativo integrado (KYC/AML).',
            '',
            '¿Te gustaría saber más sobre cómo acceder a la plataforma?',
            '1. 📥 *Cómo acceder a la plataforma*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(accederPlataformaFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cómo Acceder a la Plataforma
const accederPlataformaFlow = addKeyword(['acceder plataforma'])
    .addAnswer(
        [
            '📥 *Cómo acceder a la plataforma* 📥',
            '',
            'El proceso para acceder a nuestra plataforma es sencillo:',
            '',
            '1. 📝 Regístrate como entidad en nuestra plataforma.',
            '2. 🛠️ Configura tus servicios y herramientas de gestión.',
            '3. 🚀 Comienza a administrar tus operaciones en minutos.',
            '',
            '¿Necesitas ayuda con el registro o la configuración?',
            '1. 🔙 *Volver al menú de plataforma*',
            '2. 🔙 *Volver al menú de entidades*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(plataformaFlow);
            if (option === '2') return gotoFlow(entitiesFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );