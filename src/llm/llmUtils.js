// src/llm/llmUtils.js
export class LLMUtils {
    static validateResponse(response) {
      if (!response || response.trim() === '') {
        return 'Lo siento, no pude generar una respuesta. Por favor, intenta de nuevo.';
      }
      return response;
    }
  
    static handleError(error) {
      console.error('Error en el LLM:', error);
      return 'Hubo un problema procesando tu mensaje. Inténtalo de nuevo.';
    }
  }