import React from 'react';
import { Car } from 'lucide-react'; // Ícono de Uber

interface UberButtonProps {
  destination: string;
  latitude?: number;
  longitude?: number;
  buttonText?: string;
}

const UberButton: React.FC<UberButtonProps> = ({ destination, latitude, longitude, buttonText = "Solicitar Uber" }) => {
    const handleClick = () => {
        let url = `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(destination)}`;
        
        if (latitude && longitude) {
            url += `&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}`;
        }
        
        window.open(url, '_blank');
    };
      

  return (
    <button
      onClick={handleClick}
      className="bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg border border-white shadow hover:bg-gray-900 hover:scale-105 transition-transform inline-flex items-center space-x-2" // inline-flex para alinear icono y texto
    >
      <Car size={20} /> {/* Ícono Uber */}
      <span>{buttonText}</span>
    </button>
  );
};

export default UberButton;
