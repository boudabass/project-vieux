import React, { useState } from 'react';
import { ArrowLeft, User, Key, Phone, Bell, Save, Calendar, Pill } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('compte');

  // Exemple de données utilisateur
  const [userData, setUserData] = useState({
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@example.com',
    telephone: '06 12 34 56 78',
  });

  // Exemple de contacts d'urgence
  const [contacts, setContacts] = useState([
    { id: 1, nom: 'Dupont Jean', relation: 'Fils', telephone: '06 23 45 67 89' },
    { id: 2, nom: 'Martin Sophie', relation: 'Petite-fille', telephone: '06 34 56 78 90' },
  ]);

  // Exemple de clés API
  const [apiKeys, setApiKeys] = useState({
    mediReminder: 'xxxx-xxxx-xxxx-xxxx',
    speechify: 'xxxx-xxxx-xxxx-xxxx',
    aimybox: 'xxxx-xxxx-xxxx-xxxx',
  });

  // Exemple de données médicales
  const [medicalData, setMedicalData] = useState({
    medecins: [
      { id: 1, nom: 'Dr. Martin', specialite: 'Généraliste', telephone: '01 23 45 67 89' },
      { id: 2, nom: 'Dr. Dubois', specialite: 'Cardiologue', telephone: '01 34 56 78 90' }
    ],
    medicaments: [
      { id: 1, nom: 'Doliprane', dosage: '1000mg', frequence: '3 fois par jour' },
      { id: 2, nom: 'Kardégic', dosage: '75mg', frequence: '1 fois par jour' }
    ],
    rendezVous: [
      { id: 1, date: '15/06/2025', heure: '10:00', medecin: 'Dr. Martin', lieu: 'Cabinet médical' },
      { id: 2, date: '22/06/2025', heure: '14:30', medecin: 'Dr. Dubois', lieu: 'Hôpital Saint-Louis' }
    ]
  });

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'compte':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Informations personnelles</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-xl font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={userData.nom}
                  onChange={handleUserDataChange}
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-xl font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={userData.prenom}
                  onChange={handleUserDataChange}
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xl font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-xl font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={userData.telephone}
                  onChange={handleUserDataChange}
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Clés API</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="mediReminder" className="block text-xl font-medium text-gray-700 mb-2">
                  MediReminder
                </label>
                <input
                  type="text"
                  id="mediReminder"
                  value={apiKeys.mediReminder}
                  readOnly
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="speechify" className="block text-xl font-medium text-gray-700 mb-2">
                  Speechify
                </label>
                <input
                  type="text"
                  id="speechify"
                  value={apiKeys.speechify}
                  readOnly
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label htmlFor="aimybox" className="block text-xl font-medium text-gray-700 mb-2">
                  Aimybox
                </label>
                <input
                  type="text"
                  id="aimybox"
                  value={apiKeys.aimybox}
                  readOnly
                  className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Contacts famille</h3>
            <div className="space-y-6">
              {contacts.map(contact => (
                <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-bold mb-2">{contact.nom}</h4>
                  <p className="text-lg mb-1"><span className="font-medium">Relation:</span> {contact.relation}</p>
                  <p className="text-lg"><span className="font-medium">Téléphone:</span> {contact.telephone}</p>
                  <div className="mt-4 flex space-x-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium">
                      Modifier
                    </button>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-medium">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
              <button className="w-full bg-green-600 text-white px-6 py-4 rounded-lg text-xl font-medium">
                + Ajouter un contact
              </button>
            </div>
          </div>
        );
      case 'urgence':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Contacts d'urgence</h3>
            <div className="bg-red-50 border-2 border-red-500 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-red-700 mb-4">Numéros d'urgence</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <span className="text-xl font-bold">SAMU</span>
                  <span className="text-xl font-bold">15</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <span className="text-xl font-bold">Police</span>
                  <span className="text-xl font-bold">17</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <span className="text-xl font-bold">Pompiers</span>
                  <span className="text-xl font-bold">18</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
                  <span className="text-xl font-bold">Urgence Européen</span>
                  <span className="text-xl font-bold">112</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">SOS Senior</h4>
              <div className="flex items-center justify-between">
                <span className="text-lg">Activer les alertes d'urgence</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      case 'medical':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Gestion Médicale</h3>
            
            {/* Médecins */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Mes médecins</h4>
              <div className="space-y-4">
                {medicalData.medecins.map(medecin => (
                  <div key={medecin.id} className="p-4 border-2 border-blue-100 rounded-lg">
                    <h5 className="text-lg font-bold">{medecin.nom}</h5>
                    <p className="text-lg"><span className="font-medium">Spécialité:</span> {medecin.specialite}</p>
                    <p className="text-lg"><span className="font-medium">Téléphone:</span> {medecin.telephone}</p>
                    <div className="mt-2">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-medium">
                        Appeler
                      </button>
                    </div>
                  </div>
                ))}
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium">
                  + Ajouter un médecin
                </button>
              </div>
            </div>
            
            {/* Médicaments */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Mes médicaments</h4>
              <div className="space-y-4">
                {medicalData.medicaments.map(medicament => (
                  <div key={medicament.id} className="p-4 border-2 border-green-100 rounded-lg">
                    <h5 className="text-lg font-bold">{medicament.nom}</h5>
                    <p className="text-lg"><span className="font-medium">Dosage:</span> {medicament.dosage}</p>
                    <p className="text-lg"><span className="font-medium">Fréquence:</span> {medicament.frequence}</p>
                  </div>
                ))}
                <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium">
                  + Ajouter un médicament
                </button>
              </div>
            </div>
            
            {/* Rendez-vous */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Mes rendez-vous</h4>
              <div className="space-y-4">
                {medicalData.rendezVous.map(rdv => (
                  <div key={rdv.id} className="p-4 border-2 border-purple-100 rounded-lg">
                    <h5 className="text-lg font-bold">{rdv.medecin}</h5>
                    <p className="text-lg"><span className="font-medium">Date:</span> {rdv.date} à {rdv.heure}</p>
                    <p className="text-lg"><span className="font-medium">Lieu:</span> {rdv.lieu}</p>
                  </div>
                ))}
                <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium">
                  + Ajouter un rendez-vous
                </button>
              </div>
            </div>
            
            {/* Ordonnances */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4">Mes ordonnances</h4>
              <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium">
                + Ajouter une ordonnance
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-800 text-white rounded-full p-3 mr-4"
            aria-label="Retour"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold">Réglages</h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-gray-50 p-6">
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('compte')}
                  className={`flex items-center w-full p-4 rounded-lg text-left text-xl font-medium ${activeTab === 'compte' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                >
                  <User size={24} className="mr-3" />
                  Compte utilisateur
                </button>
                <button 
                  onClick={() => setActiveTab('api')}
                  className={`flex items-center w-full p-4 rounded-lg text-left text-xl font-medium ${activeTab === 'api' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                >
                  <Key size={24} className="mr-3" />
                  Clés API
                </button>
                <button 
                  onClick={() => setActiveTab('contacts')}
                  className={`flex items-center w-full p-4 rounded-lg text-left text-xl font-medium ${activeTab === 'contacts' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                >
                  <Phone size={24} className="mr-3" />
                  Contacts famille
                </button>
                <button 
                  onClick={() => setActiveTab('urgence')}
                  className={`flex items-center w-full p-4 rounded-lg text-left text-xl font-medium ${activeTab === 'urgence' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                >
                  <Bell size={24} className="mr-3" />
                  Urgence
                </button>
                <button 
                  onClick={() => setActiveTab('medical')}
                  className={`flex items-center w-full p-4 rounded-lg text-left text-xl font-medium ${activeTab === 'medical' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200'}`}
                >
                  <Pill size={24} className="mr-3" />
                  Gestion médicale
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/4 p-8">
              {renderTabContent()}

              {activeTab === 'compte' && (
                <div className="mt-8">
                  <button className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg text-xl font-medium">
                    <Save size={24} className="mr-2" />
                    Enregistrer les modifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;