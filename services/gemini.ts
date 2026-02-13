import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askGemini = async (question: string, context: string): Promise<string> => {
  if (!apiKey) {
    return "กรุณาตั้งค่า API_KEY ในสภาพแวดล้อมเพื่อใช้งานฟีเจอร์นี้";
  }

  const modelId = 'gemini-3-flash-preview';
  const systemInstruction = `
    คุณคือผู้ช่วยอัจฉริยะของ "สำนักงานการตรวจเงินแผ่นดิน (สตง.)" หรือ State Audit Office of the Kingdom of Thailand (SAO).
    หน้าที่ของคุณคือให้ข้อมูลเกี่ยวกับประวัติ ภารกิจ โครงสร้าง และยุทธศาสตร์ขององค์กรตามข้อมูลที่ได้รับ
    
    บริบทข้อมูลปัจจุบัน:
    ${context}
    
    ตอบคำถามอย่างสุภาพ เป็นทางการ และกระชับ (ไม่เกิน 200 คำ) โดยใช้ภาษาไทย
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: question,
      config: {
        systemInstruction,
      }
    });

    return response.text || "ขออภัย ไม่สามารถประมวลผลคำตอบได้ในขณะนี้";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI";
  }
};
