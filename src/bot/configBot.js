// src/bot/configBot.js
import { createBot, createFlow } from '@builderbot/bot';
import { twilioProvider } from '../providers/twilioProvider.js';
import { welcomeFlow, usersFlow, entitiesFlow } from '../flows/index.js';
import { basePostgre } from '../database/basePostgre.js';

export const configBot = async () => {
    // Crear el flujo con todos los flujos disponibles
    const adapterFlow = createFlow([welcomeFlow, usersFlow, entitiesFlow]);

    // Crear el bot con el flujo, proveedor y base de datos
    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: twilioProvider,
        database: basePostgre,
    });

    // Iniciar el servidor HTTP
    httpServer(process.env.PORT || 3008);
    console.log('Bot está corriendo en el puerto', process.env.PORT || 3008);
};