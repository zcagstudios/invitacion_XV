import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [rotations, setRotations] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Simulación de lista de fotos
    const simulatedPhotos = [
      '/save_the_date/foto1.jpg',
      '/save_the_date/foto2.jpg',
      '/save_the_date/foto3.jpg',
      '/save_the_date/foto4.jpg',
      '/save_the_date/foto5.jpg',
      '/save_the_date/foto6.jpg',
      '/save_the_date/foto7.jpg',
      '/save_the_date/foto8.jpg',
      '/save_the_date/foto9.jpg',
      '/save_the_date/foto10.jpg',
      '/save_the_date/foto11.jpg',
    ];
    setPhotos(simulatedPhotos);

    // Arreglo de rotaciones fijas para cada foto
    const initialRotations = [5, -7, 3, 8, -5, 10, -3, 7, -9, 4, 6];
    setRotations(initialRotations);
  }, []);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center space-x-2 space-y-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative cursor-pointer w-40 h-48 md:w-48 md:h-56 lg:w-52 lg:h-64 p-2 transition-transform duration-300 md:hover:scale-105 border-4 border-transparent hover:border-rose-500" // Borde al hacer hover
            style={{
              background: 'url("../texturas/1.jpeg") center/cover no-repeat', // Imagen de fondo como textura
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              transform: `rotate(${rotations[index]}deg)`, // Rotación estática por foto
            }}
            onClick={() => setSelectedImage(photo)}
          >
            <img
              src={photo}
              alt={`Save the Date ${index + 1}`}
              className="w-full h-full object-cover border-4 border-white"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal} // Cierra el modal al hacer clic fuera de la imagen
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
