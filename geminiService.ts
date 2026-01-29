
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../components/constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getShoppingAdvice = async (userMessage: string) => {
  try {
    const productContext = PRODUCTS.map(p => 
      `${p.name} (${p.category}): ${p.description} - Price: Rp ${p.price.toLocaleString('id-ID')}`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the friendly shop assistant for "Fish It Store ID". 
      Here are our available products:
      ${productContext}

      A customer asks: "${userMessage}"
      
      Respond concisely and encourage them to explore the Secret Fish, Gamepass, Enchant Items, or Bundle Pack sections. Be helpful and underwater-themed! All prices are in Indonesian Rupiah (Rp).`,
    });

    return response.text || "I'm sorry, I'm having trouble connecting to the deep sea right now!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The tide is too high! Please try again later.";
  }
};
