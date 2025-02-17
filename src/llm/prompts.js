// src/llm/prompts.js
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

// Prompt general para establecer el contexto
const generalPrompt = `
Eres un asistente virtual de soporte al cliente. Tu tarea es ayudar a los usuarios con información detallada sobre nuestros productos y servicios. 
Puedes proporcionar información relacionada con tarjetas, transacciones, pagos internacionales, cuentas IBAN y más. Tu objetivo es proporcionar respuestas claras, concisas y útiles basadas en la información disponible en los documentos y en el flujo de la conversación.
`;

// Función principal para obtener el prompt
export async function getPrompt(userMessage, currentFlow) {
    let prompt = generalPrompt;  // Usamos el prompt general como base

    // Aquí agregamos el flujo específico y el mensaje del usuario al prompt
    prompt += `\n\nUsuario dice: "${userMessage}". Responde de manera clara y profesional.`;

    // Si el flujo es de soporte, leemos la información de los PDFs
    if (currentFlow === 'supportFlow') {
        prompt += await getPDFContent(userMessage);
    }

    // Puedes agregar más condicionales aquí si necesitas otros flujos específicos
    prompt += `\n Contexto del flujo: ${currentFlow}.`;

    return prompt;
}

// Función para obtener el contenido de los PDFs
async function getPDFContent(userMessage) {
    const pdfFolderPath = path.join(__dirname, 'pdfs'); // Cambia 'pdfs' por el nombre de tu carpeta de PDFs
    const files = fs.readdirSync(pdfFolderPath); // Leer todos los archivos en la carpeta

    let extractedText = '';

    // Iterar sobre los archivos PDF en el directorio
    for (const file of files) {
        if (file.endsWith('.pdf')) {
            const filePath = path.join(pdfFolderPath, file);
            const pdfBuffer = fs.readFileSync(filePath); // Leer el archivo PDF como buffer
            const data = await pdfParse(pdfBuffer); // Usar pdf-parse para extraer el texto

            extractedText += data.text; // Concatenar el texto extraído del PDF
        }
    }

    // Filtra o procesa el texto extraído de acuerdo al mensaje del usuario
    // Aquí puedes hacer más procesamiento si es necesario
    return ` Aquí está la información relevante extraída del PDF sobre: ${userMessage}. ${extractedText}`;
}
