import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { FURIA_INITIAL_PROMPT, FURIA_SHOP_PROMPT } from './prompt/prompt';
import { Produto } from './data/Produto';

@Injectable()
export class AppService {
  private ai: GoogleGenAI;
  private produtos: Produto[];

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
    this.inicializarProduto();
  }

  async pesquisar(prompt: string): Promise<{
    response: string;
    urls: Record<string, { imageUrl: string; lojaUrl: string }>;
  }> {
    let initial_prompt = FURIA_INITIAL_PROMPT;

    if (prompt.toLowerCase().includes('/loja')) {
      initial_prompt += FURIA_SHOP_PROMPT + this.getProdutos();
    }

    const response = await this.ai.models.generateContent({
      model: process.env.GEMINI_API_MODEL!,
      contents: [initial_prompt, `Pergunta: ${prompt}`],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const urls = Object.fromEntries(
      this.produtos.map((p) => [
        p.id,
        { imageUrl: p.imageUrl, lojaUrl: p.lojaUrl },
      ]),
    );

    return { response: response.text!, urls };
  }

  private getProdutos(): string {
    return this.produtos
      .map(
        (p) =>
          `id: ${p.id}, nome: ${p.name}, categoria: ${p.category}, descrição: ${p.description}, preço: R$ ${p.price.toFixed(2)}`,
      )
      .join('\n');
  }

  private inicializarProduto() {
    this.produtos = [
      {
        id: '1',
        name: 'Camiseta FURIA 2024',
        category: 'Vestuário',
        description:
          'Camiseta oficial da temporada 2024 da FURIA, com tecido respirável e logo bordado em alta definição.',
        price: 149.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
      {
        id: '2',
        name: 'Boné FURIA',
        category: 'Acessórios',
        description:
          'Boné snapback preto com o logo da FURIA bordado na frente e ajuste traseiro personalizado.',
        price: 89.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
      {
        id: '3',
        name: 'Calça FURIA',
        category: 'Vestuário',
        description:
          'Calça esportiva da FURIA, confeccionada em material leve e elástico para conforto máximo durante o uso.',
        price: 99.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
      {
        id: '4',
        name: 'Moletom FURIA',
        category: 'Vestuário',
        description:
          'Moletom com capuz oficial da FURIA, ideal para dias frios, com bolsos frontais e logo estampado.',
        price: 249.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
      {
        id: '5',
        name: 'Short FURIA',
        category: 'Vestuário',
        description:
          'Short oficial da FURIA, perfeito para treinos e momentos de lazer, com elástico confortável e logo lateral.',
        price: 19.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
      {
        id: '6',
        name: 'Meia FURIA',
        category: 'Acessórios',
        description:
          'Par de meias oficiais da FURIA, com suporte de arco e tecido reforçado para maior durabilidade.',
        price: 39.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
      {
        id: '7',
        name: 'Jersey FURIA E-sports',
        category: 'Vestuário',
        description:
          'Camisa oficial dos jogadores da FURIA e-sports, feita em Dry Fit para melhor desempenho e respirabilidade.',
        price: 199.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
      {
        id: '8',
        name: 'Mochila FURIA',
        category: 'Acessórios',
        description:
          'Mochila resistente com compartimento acolchoado para notebook e logo da FURIA estampado no centro.',
        price: 9.9,
        imageUrl: `${process.env.IMAGE_URL! + process.env.IMAGE_DIRECTORY!}id.jpg`,
        lojaUrl: 'https://www.furia.gg/',
      },
    ];
  }
}
