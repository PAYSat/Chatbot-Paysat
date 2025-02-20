// src/llm/prompts.js
export class Prompts {
  static getWelcomePrompt() {
    return `Eres un asistente virtual de PAYSAT MONEY. Tu tarea es ayudar a los usuarios con información detallada sobre nuestros productos y servicios. Comienza saludando y ofreciendo opciones.`;
  }

  static getInterpretationPrompt(userMessage) {
    return `El usuario dice: "${userMessage}". ¿Es un saludo, una pregunta o una selección de opción? Responde solo con "saludo", "pregunta" o "opción".`;
  }

  static getResponsePrompt(userMessage, context) {
    return `Contexto: ${context}\n\nUsuario dice: "${userMessage}". Responde de manera clara y profesional.`;
  }

  static getFollowUpPrompt() {
    return `¿Qué más te gustaría hacer?\n1. Más información\n2. Volver al menú principal\n0. Finalizar conversación`;
  }
}