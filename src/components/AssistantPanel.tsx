import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

interface AssistantPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const AssistantPanel: React.FC<AssistantPanelProps> = ({ messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
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
    // In a real app, this would integrate with Aimybox or other speech recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputMessage('Je voudrais prendre rendez-vous');
      }, 2000);
    }
  };

  return (
    <div className="w-full md:w-2/5 bg-gray-100 flex flex-col h-[calc(100vh-144px)]">
      <div className="p-6 bg-blue-700 text-white">
        <h2 className="text-3xl font-bold">Assistant</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-grow p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`p-4 rounded-xl max-w-[80%] ${
                message.isUser 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none shadow'
              }`}
            >
              <p className="text-xl">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-300">
        <div className="flex items-center">
          <button 
            onClick={toggleVoiceInput}
            className={`p-4 rounded-full mr-2 ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            <Mic size={28} />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="flex-grow p-4 border-2 border-gray-300 rounded-full text-xl focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            className="p-4 bg-blue-600 text-white rounded-full ml-2"
          >
            <Send size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantPanel;