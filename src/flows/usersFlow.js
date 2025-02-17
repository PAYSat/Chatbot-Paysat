/*import { addKeyword } from '@builderbot/bot';

export const usersFlow = addKeyword(['1', 'usuarios', 'personas naturales'])
    .addAnswer(
        [
            '',
            'Aquí tienes información sobre los servicios disponibles para *Personas Naturales (Usuarios)*:',
            '',
            '1. 💳 *Tarjeta VISA Recargable*: Usa tu tarjeta en cualquier parte del mundo.',
            '2. 🌍 *Cuenta Bancaria Internacional (IBAN)*: Maneja múltiples monedas en una sola cuenta.',
            '3. 💸 *Pagos Transfronterizos y Remesas*: Envía y recibe dinero en más de 150 monedas.',
            '4. ₿ *Liquidación en Criptomonedas (USDT)*: Recibe pagos en USDT y conviértelos a tu moneda local.',
            '5. 📊 *Consultar Saldo y Movimientos*: Accede a tu saldo y historial de transacciones en tiempo real.',
            '6. 🔙 *Volver al menú principal*.',
            '0. 🚪 *Finalizar conversación*.'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(tarjetaFlow);
            if (option === '2') return gotoFlow(ibanFlow);
            if (option === '3') return gotoFlow(opcionNoDisponibleFlow); // Opción no disponible
            if (option === '4') return gotoFlow(opcionNoDisponibleFlow); // Opción no disponible
            if (option === '5') return gotoFlow(opcionNoDisponibleFlow); // Opción no disponible
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

// Flujo de Tarjeta VISA Recargable
const tarjetaFlow = addKeyword(['tarjeta', 'visa', 'tarjeta paysat'])
    .addAnswer(
        [
            '💳 *Tarjeta VISA Recargable* 💳',
            '',
            'Con nuestra tarjeta VISA PAYSAT, puedes:',
            '',
            '🛍️ Realizar compras en línea y en tiendas físicas en cualquier parte del mundo.',
            '🔒 Protección contra fraudes y seguros de compra para que compres con total confianza.',
            '💵 Recargas flexibles: Recarga tu tarjeta en puntos de pago, transferencias bancarias, criptomonedas, ¡y mucho más!',
            '',
            '¿Te gustaría saber más sobre cómo obtener tu tarjeta o sobre las opciones de recarga disponibles?',
            '1. 📥 *Cómo obtener tu tarjeta*',
            '2. 💰 *Opciones de recarga*',
            '3. 🔙 *Volver al menú de usuarios*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(obtenerTarjetaFlow);
            if (option === '2') return gotoFlow(recargaFlow);
            if (option === '3') return gotoFlow(usersFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cómo Obtener la Tarjeta
const obtenerTarjetaFlow = addKeyword(['obtener tarjeta'])
    .addAnswer(
        [
            '📥 *Cómo obtener tu tarjeta VISA PAYSAT* 📥',
            '',
            'Obtener tu tarjeta es muy fácil:',
            '',
            '1. 📝 Regístrate en nuestra plataforma.',
            '2. 📦 Solicita tu tarjeta física o virtual.',
            '3. 🏠 Recibe tu tarjeta en tu domicilio o actívala de inmediato si es virtual.',
            '',
            '¿Necesitas ayuda con el registro o la activación?',
            '1. 🔙 *Volver al menú de tarjetas*',
            '2. 🔙 *Volver al menú de usuarios*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(tarjetaFlow);
            if (option === '2') return gotoFlow(usersFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Opciones de Recarga
const recargaFlow = addKeyword(['recarga'])
    .addAnswer(
        [
            '💰 *Opciones de Recarga* 💰',
            '',
            'Puedes recargar tu tarjeta VISA PAYSAT de varias maneras:',
            '',
            '🏦 Transferencias bancarias.',
            '💳 Tarjetas de crédito o débito.',
            '₿ Criptomonedas.',
            '🏪 Puntos de pago autorizados.',
            '',
            '¿Necesitas más detalles sobre alguna de estas opciones?',
            '1. 🔙 *Volver al menú de tarjetas*',
            '2. 🔙 *Volver al menú de usuarios*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(tarjetaFlow);
            if (option === '2') return gotoFlow(usersFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cuenta Bancaria Internacional (IBAN)
const ibanFlow = addKeyword(['iban', 'cuenta bancaria'])
    .addAnswer(
        [
            '🌍 *Cuenta Bancaria Internacional (IBAN)* 🌍',
            '',
            'Con nuestra cuenta IBAN, puedes:',
            '',
            '💱 Manejar múltiples monedas en una sola cuenta.',
            '💸 Realizar pagos y transferencias internacionales con tarifas competitivas.',
            '🚀 Acceder a pagos SEPA y SWIFT para envíos rápidos a más de 35 países.',
            '',
            '¿Te gustaría saber cómo obtener tu cuenta IBAN o conocer sus ventajas?',
            '1. 📥 *Cómo obtener una cuenta IBAN*',
            '2. ✅ *Ventajas de las cuentas IBAN*',
            '3. 🔙 *Volver al menú de usuarios*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(obtenerIBANFlow);
            if (option === '2') return gotoFlow(ventajasIBANFlow);
            if (option === '3') return gotoFlow(usersFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Cómo Obtener una Cuenta IBAN
const obtenerIBANFlow = addKeyword(['obtener iban'])
    .addAnswer(
        [
            '📥 *Cómo obtener tu cuenta IBAN* 📥',
            '',
            'Obtener tu cuenta IBAN es muy sencillo:',
            '',
            '1. 📝 Regístrate en nuestra plataforma.',
            '2. 📦 Solicita la apertura de una cuenta IBAN.',
            '3. 🏠 Recibe los datos de tu cuenta en minutos.',
            '',
            '¿Necesitas ayuda con el registro o la apertura de la cuenta?',
            '1. 🔙 *Volver al menú de cuentas IBAN*',
            '2. 🔙 *Volver al menú de usuarios*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(ibanFlow);
            if (option === '2') return gotoFlow(usersFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );

// Flujo de Ventajas de las Cuentas IBAN
const ventajasIBANFlow = addKeyword(['ventajas iban'])
    .addAnswer(
        [
            '✅ *Ventajas de las cuentas IBAN* ✅',
            '',
            'Las cuentas IBAN de PAYSAT MONEY ofrecen:',
            '',
            '🌍 Acceso global: Realiza pagos y transferencias en múltiples monedas.',
            '💼 Facilidad de uso: Gestiona tus finanzas desde una sola plataforma.',
            '🔒 Seguridad avanzada: Protección contra fraudes y cumplimiento normativo.',
            '',
            '¿Quieres saber más sobre cómo obtener tu cuenta IBAN?',
            '1. 🔙 *Volver al menú de cuentas IBAN*',
            '2. 🔙 *Volver al menú de usuarios*',
            '0. 🚪 *Finalizar conversación*'
        ].join('\n'),
        { delay: 1000, capture: true },
        async (ctx, { gotoFlow, endFlow }) => {
            const option = ctx.body.trim();
            if (option === '1') return gotoFlow(ibanFlow);
            if (option === '2') return gotoFlow(usersFlow);
            if (option === '0') return endFlow('¡Gracias por contactarnos! 👋');
            return gotoFlow(opcionNoDisponibleFlow);
        }
    );*/