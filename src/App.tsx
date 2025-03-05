import React, { useState } from 'react';
import {
    MessageSquare,
    Video,
    Calendar,
    Heart,
    Car,
    DollarSign,
    Camera,
    Shield,
    Volume2,
    Mic,
    Settings,
    QrCode,
    ArrowLeft,
    Home,
    Gamepad2,
    Phone,
    Clock,
    Pill,
    CalendarClock,
    MessageCircle,
    VideoIcon,
    AudioLines,
    Dumbbell,
    Brain,
    Puzzle,
    Shirt,
    ShoppingCart,
    Wrench,
    CreditCard,
    Gift
} from 'lucide-react';

// Components
import ServiceCard from './components/ServiceCard';
import AssistantPanel from './components/AssistantPanel';
import SettingsPage from './pages/SettingsPage';
import QrCodePage from './pages/QrCodePage';

interface Message {
    text: string;
    isUser: boolean;
}

function App() {
    const [activeService, setActiveService] = useState<string | null>(null);
    const [activePage, setActivePage] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isUser: false }
    ]);
    const [contacts, setContacts] = useState<{ name: string; phone: string }[]>([]);

    // Services principaux
    const mainServices = [
        { id: 'communication', title: 'Communiquer', icon: <Phone size={32} />, color: '#37a2ea' },
        { id: 'medical', title: 'Médical', icon: <Pill size={32} />, color: '#3748ea' },
        { id: 'wellbeing', title: 'Bien-être', icon: <Heart size={32} />, color: '#ea7f37' },
        { id: 'home', title: 'Maison', icon: <Home size={32} />, color: '#37ead9' },
        { id: 'games', title: 'Jeux Cognitifs', icon: <Brain size={32} />, color: '#37a2ea' },
        { id: 'finance', title: 'Finances', icon: <CreditCard size={32} />, color: '#3748ea' },
    ];

    // Sous-services pour chaque service principal
    const subServices = {
        communication: [
            { id: 'text', title: 'Messages Texte', icon: <MessageCircle size={32} />, color: '#37a2ea' },
            { id: 'video', title: 'Messages Vidéo', icon: <VideoIcon size={32} />, color: '#37a2ea' },
            { id: 'audio', title: 'Messages Audio', icon: <AudioLines size={32} />, color: '#37a2ea' },
        ],
        medical: [
            { id: 'medication', title: 'Mes Médicaments', icon: <Pill size={32} />, color: '#3748ea' },
            { id: 'appointments', title: 'Rendez-vous', icon: <CalendarClock size={32} />, color: '#3748ea' },
            { id: 'doctors', title: 'Mes Médecins', icon: <Calendar size={32} />, color: '#3748ea' },
        ],
        wellbeing: [
            { id: 'exercise', title: 'Exercices', icon: <Dumbbell size={32} />, color: '#ea7f37' },
            { id: 'meditation', title: 'Méditation', icon: <Heart size={32} />, color: '#ea7f37' },
            { id: 'brain', title: 'Stimulation Cognitive', icon: <Brain size={32} />, color: '#ea7f37' },
            { id: 'social', title: 'Activités Sociales', icon: <MessageSquare size={32} />, color: '#ea7f37' },
        ],
        home: [
            { id: 'cleaning', title: 'Ménage', icon: <Home size={32} />, color: '#37ead9' },
            { id: 'laundry', title: 'Repassage', icon: <Shirt size={32} />, color: '#37ead9' },
            { id: 'shopping', title: 'Courses', icon: <ShoppingCart size={32} />, color: '#37ead9' },
            { id: 'repair', title: 'Bricolage', icon: <Wrench size={32} />, color: '#37ead9' },
        ],
        games: [
            { id: 'circuit', title: 'Circuit Interface', icon: <Puzzle size={32} />, color: '#37a2ea' },
            { id: 'hunt', title: 'Chasse aux Fonctions', icon: <Gamepad2 size={32} />, color: '#37a2ea' },
            { id: 'simon', title: 'Simon Interface', icon: <Brain size={32} />, color: '#37a2ea' },
            { id: 'quiz', title: 'Quiz Visuel', icon: <MessageSquare size={32} />, color: '#37a2ea' },
            { id: 'match', title: 'Associe et Gagne', icon: <Puzzle size={32} />, color: '#37a2ea' },
            { id: 'memory', title: 'Mémoire Active', icon: <Brain size={32} />, color: '#37a2ea' },
        ],
        finance: [
            { id: 'expenses', title: 'Dépenses', icon: <CreditCard size={32} />, color: '#3748ea' },
            { id: 'gifts', title: 'Cadeaux', icon: <Gift size={32} />, color: '#3748ea' },
            { id: 'shopping', title: 'Achats', icon: <ShoppingCart size={32} />, color: '#3748ea' },
        ],
    };

    const handleServiceClick = (serviceId: string) => {
        setActiveService(serviceId);
        handleMessage(`J'aimerais utiliser le service ${serviceId}`, true);
    };

    const handleBackToMainServices = () => {
        setActiveService(null);
    };

    const handleMessage = (text: string, isUser: boolean) => {
        setMessages(prev => [...prev, { text, isUser }]);
    };

    const navigateTo = (page: string) => {
        setActivePage(page);
    };

    const navigateBack = () => {
        setActivePage(null);
    };

    const handleAddContact = (contact: { name: string, phone: string }) => {
        setContacts(prevContacts => [...prevContacts, contact]);
    };

    // Render the active page or the main content
    const renderContent = () => {
        if (activePage === 'settings') {
            return <SettingsPage onBack={navigateBack} />;
        } else if (activePage === 'qrcode') {
            return <QrCodePage onBack={navigateBack} />;
        } else {
            return (
                <main className="flex-grow flex flex-col md:flex-row">
                    {/* Assistant Panel (40%) */}
                    <AssistantPanel
                        messages={messages}
                        onSendMessage={handleMessage}
                        onAddContact={handleAddContact}
                    />

                    {/* Services Panel (60%) */}
                    <div className="w-full md:w-3/5 p-6 bg-white">
                        {activeService ? (
                            <>
                                <div className="flex items-center mb-8">
                                    <button
                                        onClick={handleBackToMainServices}
                                        className="bg-primary hover:bg-blue-500 text-white rounded-full p-3 mr-4"
                                        aria-label="Retour"
                                    >
                                        <ArrowLeft size={24} />
                                    </button>
                                    <h2 className="text-3xl font-bold text-gray-800">
                                            {mainServices.find(s => s.id === activeService)?.title}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {subServices[activeService as keyof typeof subServices]?.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            title={service.title}
                                            icon={service.icon}
                                            color={service.color}
                                            onClick={() => handleServiceClick(`${activeService}.${service.id}`)}
                                        />
                                    ))}
                                </div>
                                {activeService === 'communication' && (
                                    <div className="mt-8">
                                        <h3 className="text-2xl font-bold mb-4">Contacts</h3>
                                        <ul>
                                            {contacts.map((contact, index) => (
                                                <li key={index} className="mb-2">
                                                    <span className="font-bold">{contact.name}</span> - {contact.phone}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold mb-8 text-gray-800">Services</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mainServices.map((service) => (
                                        <ServiceCard
                                            key={service.id}
                                            title={service.title}
                                            icon={service.icon}
                                            color={service.color}
                                            onClick={() => handleServiceClick(service.id)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </main>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-primary text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Connecteur Social</h1>
                    <div className="flex space-x-4">
                        <button
                            className="bg-secondary hover:bg-indigo-500 text-white rounded-full p-3"
                            aria-label="Paramètres"
                            title="Paramètres"
                            onClick={() => navigateTo('settings')}
                        >
                            <Settings size={24} />
                        </button>
                        <button
                            className="bg-tertiary hover:bg-teal-500 text-white rounded-full p-3"
                            aria-label="Partager (QR Code)"
                            title="Partager (QR Code)"
                            onClick={() => navigateTo('qrcode')}
                        >
                            <QrCode size={24} />
                        </button>
                        <button
                            className="bg-accent hover:bg-orange-500 text-white rounded-full p-3"
                            aria-label="Sécurité"
                            title="Sécurité"
                        >
                            <Shield size={24} />
                        </button>
                        <button
                            className="bg-secondary hover:bg-indigo-500 text-white rounded-full p-3"
                            aria-label="Volume"
                            title="Volume"
                        >
                            <Volume2 size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            {renderContent()}

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p className="text-xl">Connecteur Social Senior-Tech © 2025 Zaug Johnny</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
