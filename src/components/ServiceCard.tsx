import React from 'react';

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon, color, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-200 min-h-[180px]"
      style={{ borderLeftColor: color, borderLeftWidth: '8px' }}
    >
      <div 
        className="rounded-full p-4 mb-4 flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }} // 20% opacity of the color
      >
        <div style={{ color: color }}>
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </button>
  );
};

export default ServiceCard;