import React from 'react';
import Separador from './Separador';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rose-200 text-rose-800 py-6 text-center header-marco-dark-no-top"
    style={{
      background: 'url("../texturas/1.jpeg") center/cover no-repeat', // Imagen de fondo como textura
      boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)',  // Sombra más fuerte
    }}>
      <Separador contrast />
      <p style={{ fontFamily: '"Tangerine", cursive', fontSize: '2rem', fontWeight: 'bold' }}>Esperamos contar con tu presencia en este día tan especial para nosotros.</p>
      <p className="mt-2" style={{ fontFamily: '"Tangerine", cursive', fontSize: '2rem', fontWeight: 'bold' }}>¡No olvides confirmar tu asistencia!</p>
      <p className="mt-2 " style={{ fontFamily: '"Tangerine", cursive', fontSize: '3rem', fontWeight: 'bolder' }}>Ángel & Ely</p>
      
      <Separador contrast />

      {/* Nota de derechos reservados */}
      <p className="text-sm mt-4 text-gray-600">
        &copy; 2024. Todos los derechos reservados.<br/> 
        Diseñado por <span className="font-bold">Sergio Ángel Dévora Cuéllar y Perla del Rocío Dévora Cuéllar</span>.
      </p>
    </footer>
  );
};

export default Footer;
