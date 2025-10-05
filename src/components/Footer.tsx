import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-royal-900 text-white py-12 mt-12 overflow-hidden">
      {/* Overlay con glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <p className="font-script text-3xl mb-2 text-gold-400">Marcela & Marcelo</p>
        <p className="text-gold-300 font-serif mb-6 text-lg">XV Años - 24 de Enero, 2026</p>
        <div className="border-t border-gold-400/50 pt-6 mt-4">
          <p className="text-base text-white/90">
            Hecho con 💛 para celebrar este día especial
          </p>
          <p className="text-sm text-purple-200 mt-3 italic font-script text-xl">
            "La belleza se encuentra en el corazón"
          </p>
        </div>
      </div>

      {/* Decoración con rosas */}
      <div className="absolute top-4 left-4 text-4xl opacity-20">🌹</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-20">🌹</div>
    </footer>
  );
};

export default Footer;
