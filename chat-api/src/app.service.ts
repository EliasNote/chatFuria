import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { FURIA_INITIAL_PROMPT } from './prompt/prompt';

@Injectable()
export class AppService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }

  async pesquisar(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: process.env.GEMINI_API_MODEL!,
      contents: [FURIA_INITIAL_PROMPT, `Pergunta: ${prompt}`],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text!;
  }
}
