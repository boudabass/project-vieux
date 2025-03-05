import React, { useState } from 'react';
import { ArrowLeft, UserPlus, Share2, Download } from 'lucide-react';

interface QrCodePageProps {
  onBack: () => void;
}

const QrCodePage: React.FC<QrCodePageProps> = ({ onBack }) => {
  const [userName, setUserName] = useState('Marie Dupont');
  const [qrCodeGenerated, setQrCodeGenerated] = useState(true);
  
  // URL d'exemple pour le QR code (normalement générée dynamiquement)
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ConnecteurSocial:UserID=12345&color=003d99";
  
  return (
    <div className="flex-grow bg-gray-100 p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="bg-primary hover:bg-blue-500 text-white rounded-full p-3 mr-4"
            aria-label="Retour"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold">Partage par QR Code</h2>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Connectez-vous avec d'autres utilisateurs</h3>
            <p className="text-xl text-gray-700">
              Générez un QR code pour vous connecter automatiquement avec un autre utilisateur.
              Lorsqu'ils scanneront ce code, vous serez ajoutés à vos contacts respectifs.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center mb-8">
            {qrCodeGenerated ? (
              <div className="text-center">
                <div className="bg-blue-50 p-6 rounded-xl inline-block mb-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code de connexion" 
                    className="w-64 h-64"
                  />
                </div>
                <p className="text-xl font-bold mb-2">QR Code pour {userName}</p>
                <p className="text-lg text-gray-600 mb-6">
                  Valide pendant 15 minutes
                </p>
              </div>
            ) : (
              <button 
                onClick={() => setQrCodeGenerated(true)}
                className="flex items-center justify-center bg-primary hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-xl font-bold"
              >
                <UserPlus size={24} className="mr-3" />
                Générer un QR Code
              </button>
            )}
          </div>
          
          {qrCodeGenerated && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center bg-tertiary hover:bg-teal-500 text-white px-6 py-4 rounded-lg text-xl font-medium">
                  <Share2 size={24} className="mr-2" />
                  Partager
                </button>
                <button className="flex-1 flex items-center justify-center bg-secondary hover:bg-indigo-500 text-white px-6 py-4 rounded-lg text-xl font-medium">
                  <Download size={24} className="mr-2" />
                  Télécharger
                </button>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-accent p-4 rounded">
                <p className="text-lg text-yellow-700">
                  <strong>Instructions :</strong> Montrez ce QR code à la personne avec qui vous souhaitez vous connecter. 
                  Elle devra le scanner avec l'application Connecteur Social.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Scanner un QR Code</h3>
          <p className="text-xl text-gray-700 mb-6">
            Vous avez reçu un QR code d'un autre utilisateur ? Scannez-le pour vous connecter automatiquement.
          </p>
          <button className="w-full flex items-center justify-center bg-accent hover:bg-orange-500 text-white px-6 py-4 rounded-lg text-xl font-medium">
            <Camera size={24} className="mr-2" />
            Ouvrir le scanner
          </button>
        </div>
      </div>
    </div>
  );
};

// Ajout du composant Camera manquant
const Camera = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
};

export default QrCodePage;