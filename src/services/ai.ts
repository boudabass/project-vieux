import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export type AIProvider = 'openai' | 'gemini';

interface AIConfig {
  provider: AIProvider;
  apiKey: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export class AIService {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;
  private currentProvider: AIProvider = 'openai';
  private conversationHistory: Message[] = [];

  constructor() {
    const savedConfig = localStorage.getItem('aiConfig');
    if (savedConfig) {
      const config: AIConfig = JSON.parse(savedConfig);
      this.setProvider(config.provider, config.apiKey);
    }
  }

  setProvider(provider: AIProvider, apiKey: string) {
    if (!apiKey?.trim()) {
      throw new Error('La clé API ne peut pas être vide');
    }

    this.currentProvider = provider;
    this.conversationHistory = []; // Reset conversation when switching providers

    if (provider === 'openai') {
      this.openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      this.gemini = null;
    } else {
      this.gemini = new GoogleGenerativeAI(apiKey);
      this.openai = null;
    }
    
    localStorage.setItem('aiConfig', JSON.stringify({ provider, apiKey }));
  }

  async sendMessage(message: string): Promise<string> {
    if (!message?.trim()) {
      throw new Error('Le message ne peut pas être vide');
    }

    try {
      // Add user message to history
      this.conversationHistory.push({ role: 'user', content: message });

      let response: string;

      if (this.currentProvider === 'openai' && this.openai) {
        const completion = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: this.conversationHistory.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 1000
        });

        response = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";
      } else if (this.currentProvider === 'gemini' && this.gemini) {
        const model = this.gemini.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        
        // For Gemini, we need to format the conversation history as a single context string
        const conversationContext = this.conversationHistory
          .map(msg => `${msg.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${msg.content}`)
          .join('\n');

        const result = await model.generateContent(conversationContext);
        const geminiResponse = await result.response;
        response = geminiResponse.text() || "Désolé, je n'ai pas pu générer une réponse.";
      } else {
        throw new Error('Aucun fournisseur d\'IA configuré');
      }

      // Add assistant response to history
      this.conversationHistory.push({ role: 'assistant', content: response });

      return response;
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "Erreur: Clé API invalide. Veuillez vérifier vos paramètres.";
        } else if (error.message.includes('rate limit')) {
          return "Erreur: Limite de requêtes atteinte. Veuillez réessayer plus tard.";
        } else if (error.message.includes('network')) {
          return "Erreur: Problème de connexion. Veuillez vérifier votre connexion internet.";
        }
      }
      
      return "Une erreur s'est produite. Veuillez réessayer.";
    }
  }

  async handleCommand(message: string): Promise<string> {
    if (message.toLowerCase().includes("ajouter une personne à mes contacts")) {
      // Déclencher une série de questions pour ajouter un contact
      return "D'accord, quel est le nom de la personne que vous souhaitez ajouter ?";
    }
    // Autres commandes peuvent être ajoutées ici
    return "";
  }

  getCurrentProvider(): AIProvider {
    return this.currentProvider;
  }

  isConfigured(): boolean {
    return !!(this.openai || this.gemini);
  }

  clearConversation(): void {
    this.conversationHistory = [];
  }
}

export const aiService = new AIService();