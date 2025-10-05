import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react'; // Ícono de mapa

interface MapModalProps {
  buttonText: string;
  mapUrl: string;
}

const Map: React.FC<MapModalProps> = ({ buttonText, mapUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-white text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg border border-gray-400 shadow hover:bg-gray-50 hover:scale-105 hover:border-gray-500 transition-transform inline-flex items-center space-x-2" // inline-flex para alinear icono y texto
      >
        <MapPin size={20} /> {/* Ícono Map */}
        <span>{buttonText}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal} // Cierra el modal si se hace clic en el fondo
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal cierre el popup
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
