import { GoogleGenAI, Chat } from "@google/genai";

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

export const createSupportChat = (): Chat | null => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing for Live Chat");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are Priya, a friendly and knowledgeable Customer Support Specialist for Emphz GRP Solutions.
        
        Your Goal:
        - Assist visitors in navigating the website.
        - Briefly explain product benefits (Corrosion resistance, Waterproof IP66, Maintenance-free).
        - Guide users to the 'Products' page for browsing or 'RFQ' page for quotes.
        
        Tone:
        - Warm, professional, and helpful.
        - Keep responses short (2-3 sentences) suitable for a small chat widget.
        
        Key Info:
        - We manufacture in Mysore, India.
        - We specialize in GRP (Glass Reinforced Plastic) enclosures and kiosks.
        - If you don't know an answer, suggest checking the Technical Center or emailing info@emphz.in.`,
        temperature: 0.7, // Slightly higher for conversation
      }
    });
  } catch (error) {
    console.error("Failed to create chat session:", error);
    return null;
  }
};