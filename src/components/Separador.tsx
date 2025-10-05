import React from 'react';

const Separador: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="flex-grow border-t-2 border-gold-300"></div>
      <span className="px-4 text-3xl">🌹</span>
      <div className="flex-grow border-t-2 border-gold-300"></div>
    </div>
  );
};

export default Separador;
