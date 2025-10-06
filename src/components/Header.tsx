import React, { useEffect, useState } from 'react';

const calculateTimeLeft = () => {
  // Fecha del evento: 24 de enero 2026, 7:00 PM (hora de Hermosillo)
  const targetDate = new Date('2026-01-24T19:00:00-07:00'); // MST timezone
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Header: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className="header-marco-dark bg-cover bg-center h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/portada.png")',
      }}
    >
      <div
        className="relative z-10 text-center text-white bg-white/5 backdrop-blur-sm p-8 rounded-3xl max-w-2xl w-[95%] shadow-2xl border border-white/30"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        }}
      >
        <div className="mb-4">
          <span className="text-6xl">🌹</span>
        </div>

        <h1
          className="text-white mb-2 font-script"
          style={{ fontSize: '4rem', fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.5)', lineHeight: '0.9' }}
        >
          Marcela
          <br />
          <span className="text-gold-400 text-5xl">&</span>
          <br />
          Marcelo
        </h1>

        <div className="my-6 border-t-2 border-b-2 border-gold-500 py-4">
          <p className="text-gold-400 font-script text-3xl font-bold">
            XV Años
          </p>
          <p className="text-white text-2xl mt-2 font-serif">
            24 de Enero, 2026
          </p>
        </div>

        <div className="mt-6">
          <p className="text-gold-300 font-script text-xl mb-4">Faltan:</p>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center">
              <span className="block text-gold-400 font-script text-5xl font-bold">{timeLeft.days}</span>
              <span className="block mt-2 text-white font-serif text-lg">Días</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="block text-gold-400 font-script text-5xl font-bold">{timeLeft.hours}</span>
              <span className="block mt-2 text-white font-serif text-lg">Horas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="block text-gold-400 font-script text-5xl font-bold">{timeLeft.minutes}</span>
              <span className="block mt-2 text-white font-serif text-lg">Minutos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="block text-gold-400 font-script text-5xl font-bold">{timeLeft.seconds}</span>
              <span className="block mt-2 text-white font-serif text-lg">Segundos</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-purple-200 font-script text-3xl italic">
            "La belleza se encuentra en el corazón"
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
