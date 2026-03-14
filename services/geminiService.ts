import { GoogleGenAI } from "@google/genai";

const AI_API_KEY = process.env.API_KEY || '';

// Fallback if key is missing to prevent crash, though standard practice is key is present.
const isKeyAvailable = !!AI_API_KEY;

export const refineQuestion = async (rawInput: string): Promise<string> => {
  if (!isKeyAvailable) {
    console.warn("Gemini API Key missing");
    return rawInput;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: AI_API_KEY });
    
    // Using a flash model for low latency text processing
    const modelId = 'gemini-3-flash-preview'; 

    const response = await ai.models.generateContent({
      model: modelId,
      contents: `
        You are an editor for a high-profile venture capital event with Niko Bonatsos.
        A user has drafted a question for the Q&A session. 
        Refine the following text to be more concise, professional, and insightful, suitable for a room of outliers and founders.
        Keep the core intent but elevate the language. Do not change the meaning.
        
        Input: "${rawInput}"
        
        Return only the refined question text.
      `,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Minimize latency
        temperature: 0.7
      }
    });

    return response.text?.trim() || rawInput;

  } catch (error) {
    console.error("Gemini refinement failed:", error);
    return rawInput; // Fallback to original
  }
};