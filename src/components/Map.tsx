import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

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
        className="bg-white text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg border-2 border-gold-400 shadow-md hover:bg-gold-50 hover:scale-105 hover:border-gold-500 transition-all inline-flex items-center space-x-1"
      >
        <MapPin size={16} className="text-gold-600" />
        <span>{buttonText}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white p-6 rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors bg-white rounded-full p-2 shadow-lg"
            >
              <X size={24} />
            </button>
            <iframe
              src={mapUrl}
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '8px' }}
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
