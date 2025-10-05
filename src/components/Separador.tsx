import React from 'react';
import { GiDiamondRing } from "react-icons/gi"; // Ícono decorativo

interface SeparadorProps {
  contrast?: boolean; // Propiedad opcional para aplicar contraste
}

const Separador: React.FC<SeparadorProps> = ({ contrast = false }) => {
  return (
    <div className="flex items-center justify-center my-8">
      {/* Imagen izquierda */}
      <div className="w-1/3 flex justify-end">
        <img 
          src="/separador_izq.png" 
          alt="Separador corazones" 
          className="h-6 w-40" // Ajusta la altura según sea necesario
        />
      </div>

      {/* Ícono decorativo en el centro */}
      <div className={`mx-4 ${contrast ? 'text-rose-500' : 'text-rose-500'}`}>
        <GiDiamondRing className="w-6 h-6" />
      </div>

      {/* Imagen derecha */}
      <div className="w-1/3 flex justify-start">
        <img 
          src="/separador_der.png" 
          alt="Separador corazones" 
          className="h-6 w-40" // Ajusta la altura según sea necesario
        />
      </div>
    </div>
  );
};

export default Separador;
