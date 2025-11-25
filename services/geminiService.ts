import { GoogleGenAI } from "@google/genai";

// Note: In a real app, handle API keys securely via backend proxies.
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const askTechnicalAssistant = async (query: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: API Key is missing. Please configure the environment variable.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `You are "Emphz Bot", a Senior Technical Engineer for Emphz, a manufacturer of GRP (Glass Reinforced Plastic) enclosures.
        
        Your Context:
        - Emphz is based in Kerala and Mysore, India.
        - You specialize in industrial environments, coastal corrosion issues, and electrical safety.
        - Key Advantages of GRP: Non-corrosive (better than steel for coasts), electrically insulating, lightweight, UV stable, high IP ratings (IP66/67).
        - Products: Enclosures, Junction Boxes, Kiosks, Cabins.
        
        Your Role:
        - Answer technical questions about material properties (GRP vs Steel vs Polycarbonate).
        - Recommend products based on IP ratings, Fire ratings (UL94), and IK ratings.
        - Explain installation in humid/coastal climates.
        - Be professional, concise, and engineering-focused.
        - If asked about pricing, direct them to the RFQ page.
        
        Formatting:
        - Use bullet points for technical specs.
        - Keep answers under 150 words unless asked for a detailed report.`,
        temperature: 0.3, // Keep it factual and precise
      }
    });

    return response.text || "I apologize, I could not retrieve the technical data at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Error: Unable to contact the technical knowledge base.";
  }
};