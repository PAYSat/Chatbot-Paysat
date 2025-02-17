import { configuration, OpenAIApi } from 'openai';

//Configuracion de openAi

const configuration = new Configuration({

    apiKey: process.env.OPENAI_API_KEY, //configuracion del apikey 

});

const openai = new OpenAIApi(configuration);

export default openai;