import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateArtContent(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error generating content. Please try again.";
  }
}

export async function getBusinessStrategy(category: string, userIntent: string) {
  const prompt = `Actúa como un experto consultor de negocios y marketing digital para un artista digital. 
  Tarea: Generar un plan estratégico específico para la categoría "${category}" basado en el siguiente pedido: "${userIntent}".
  
  El plan debe incluir:
  1. SEO: Palabras clave y optimización.
  2. Marketing de Contenidos: Ideas de blog y newsletters.
  3. Redes Sociales: Estrategia orgánica (Reels, TikTok, Instagram).
  4. Automatización con IA: Cómo usar la IA para ahorrar tiempo.
  
  Responde en formato Markdown claro y profesional en español.`;

  return generateArtContent(prompt);
}
