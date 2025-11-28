import { GoogleGenAI } from "@google/genai";

export const askTechnicalAssistant = async (query: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API Key is missing. Please configure the environment variable.";
  }

  try {
    // Initialize client inside the function to ensure it uses the current API key context
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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