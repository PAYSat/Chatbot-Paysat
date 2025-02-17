import { createBot, createFlow } from '@builderbot/bot';
import { twilioProvider } from '../providers/twilioProvider.js';
import { welcomeFlow } from '../flows/welcomeFlow.js';
import { basePostgre } from '../database/postgresDB.js';

export const configBot = async () => {
    const adapterFlow = createFlow([welcomeFlow]);
    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: twilioProvider,
        database: basePostgre,
    });
    httpServer(process.env.PORT || 3008);
    console.log('Bot está corriendo en el puerto', process.env.PORT || 3008);
};