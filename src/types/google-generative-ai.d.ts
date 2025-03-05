declare module '@google/generative-ai' {
  // Ajoutez ici les types nécessaires pour votre utilisation
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(options: { model: string }): any;
  }
} 