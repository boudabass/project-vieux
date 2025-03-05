import { Mic, Send, RefreshCw } from 'lucide-react';
import { aiService } from '../services/ai';

interface Message {
    text: string;
    isUser: boolean;
}

interface AssistantPanelProps {
    messages: Message[];
    onSendMessage: (message: string, isUser: boolean) => void;
    onAddContact: (contact: { name: string, phone: string }) => void;
}

const AssistantPanel: React.FC<AssistantPanelProps> = ({ messages, onSendMessage, onAddContact }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() && !isLoading) {
            setIsLoading(true);
            const userMessage = inputMessage.trim();
            onSendMessage(userMessage, true); // Envoyer le message de l'utilisateur à App.tsx
            setInputMessage('');

            try {
                // Vérifiez si le message est une commande
                const commandResponse = await handleCommand(userMessage);
                if (commandResponse) {
                    onSendMessage(commandResponse, false);
                } else {
                    const response = await aiService.sendMessage(userMessage);
                    onSendMessage(response, false); // Envoyer la réponse de l'IA à App.tsx
                }
            } catch (error) {
                console.error('Error sending message:', error);
                onSendMessage("Désolé, une erreur s'est produite. Veuillez réessayer.", false); // Envoyer le message d'erreur à App.tsx
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleVoiceInput = () => {
        setIsListening(!isListening);
        if (!isListening) {
            setTimeout(() => {
                setIsListening(false);
                setInputMessage('Je voudrais prendre rendez-vous');
            }, 2000);
        }
    };

    const handleNewConversation = () => {
        aiService.clearConversation();
        onSendMessage("Nouvelle conversation démarrée.", false);
    };

    const handleCommand = async (message: string) => {
        if (message.toLowerCase().includes("ajouter une personne à mes contacts")) {
            const contact = { name: "Zaug Johnny", phone: "0689350464" }; // Exemple de données
            onAddContact(contact);
            return "Contact ajouté avec succès.";
        }
        return "";
    };

    return (
        <div className="w-full md:w-2/5 bg-gray-100 flex flex-col h-[calc(100vh-144px)]">
            <div className="p-6 bg-primary text-white">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">Assistant</h2>
                    <button
                        onClick={handleNewConversation}
                        className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                        title="Nouvelle conversation"
                    >
                        <RefreshCw size={24} />
                    </button>
                </div>
                {!aiService.isConfigured() && (
                    <p className="text-white mt-2">
                        ⚠️ Configurez une clé API dans les paramètres pour utiliser l'assistant IA
                    </p>
                )}
            </div>

            <div className="flex-grow p-6 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`p-4 rounded-xl max-w-[80%] ${message.isUser
                                ? 'bg-secondary text-white rounded-tr-none'
                                : 'bg-white text-gray-800 rounded-tl-none shadow'
                                }`}
                        >
                            <p className="text-xl">{message.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-300">
                <div className="flex items-center">
                    <button
                        onClick={toggleVoiceInput}
                        className={`p-4 rounded-full mr-2 ${isListening ? 'bg-accent text-white' : 'bg-gray-200 text-gray-700'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        disabled={!aiService.isConfigured() || isLoading}
                    >
                        <Mic size={28} />
                    </button>
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={aiService.isConfigured() ? "Tapez votre message..." : "Configurez l'IA dans les paramètres"}
                        className="flex-grow p-4 border-2 border-gray-300 rounded-full text-xl focus:outline-none focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={!aiService.isConfigured() || isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-4 bg-primary text-white rounded-full ml-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                        disabled={!aiService.isConfigured() || isLoading || !inputMessage.trim()}
                    >
                        <Send size={28} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssistantPanel;
