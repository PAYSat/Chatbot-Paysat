import { createBot, createFlow } from '@builderbot/bot';
import { twilioProvider } from '../providers/twilioProvider.js';
import { basePostgre } from '../database/basePostgre.js';
import { welcomeFlow, usersFlow, entitiesFlow, supportFlow } from '../flows/index.js';

export const configBot = async () => {
    const adapterFlow = createFlow([welcomeFlow, usersFlow, entitiesFlow, supportFlow]);
    const { httpServer } = await createBot({
        flow: adapterFlow,
        provider: twilioProvider,
        database: basePostgre,
    });

    httpServer(process.env.PORT || 3008);
};