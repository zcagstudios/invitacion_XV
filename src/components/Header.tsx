import React, { useEffect, useState } from 'react';

// Función para calcular los días restantes en la zona horaria de Hermosillo
const calculateTimeLeft = () => {
  const targetDateString = '2024-12-07T00:00:00';
  const timeZone = 'America/Hermosillo';

  // Función auxiliar para obtener la fecha en la zona horaria específica
  function getDateInTimeZone(dateInput: string | Date, timeZone: string) {
    const date = new Date(dateInput);
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const dateParts: Record<string, string> = {};
    for (const part of parts) {
      dateParts[part.type] = part.value;
    }
    const { year, month, day, hour, minute, second } = dateParts;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
  }

  const targetDate = getDateInTimeZone(targetDateString, timeZone);
  const nowDate = getDateInTimeZone(new Date(), timeZone);

  const difference = targetDate.getTime() - nowDate.getTime();

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

  // Actualizar el contador cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className="header-marco-dark bg-cover bg-center h-screen flex items-end justify-center"
      style={{ backgroundImage: 'url("/portada.jpg")' }}
    >
      <div
        className="relative z-10 text-center text-white bg-black bg-opacity-50 p-4 rounded mb-4 max-w-2xl w-[97%] shadow-lg backdrop-blur-sm"
        style={{
          backgroundImage: 'url("/marco.png")',
          backgroundSize: '25% 70%', // Ajusta la imagen para cubrir todo el div
          backgroundRepeat: 'no-repeat', // No repite la imagen
          padding: '0rem',
        }}
      >
        <h1 className="text-4xl text-white tracking-wide leading-tight" style={{ fontFamily: '"Tangerine", cursive', fontSize: '3rem', fontWeight: 'bold' }}>Ángel & Ely</h1>
        <p className="text-2xl mt-1 text-gold-400" style={{ fontFamily: '"Tangerine", cursive', fontSize: '2.5rem', fontWeight: 'bold' }}>
          ¡Nos vamos a casar! <span className="text-3xl text-white ml-2">07.12.2024</span>
        </p>

        {/* Contador regresivo */}
        <div className="mt-2 text-base font-light text-white">
          <div className="flex justify-center space-x-4 mt-1">
            <div>
              <span className="block text-gold-400" style={{ fontFamily: '"Tangerine", cursive', fontSize: '2.5rem', fontWeight: 'bold' }}>{timeLeft.days}</span>
              <span className="block mt-4" style={{ fontFamily: '"Tangerine", cursive', fontSize: '1.5rem', fontWeight: 'bold' }}>Días</span>
            </div>
            <div>
              <span className="block text-gold-400" style={{ fontFamily: '"Tangerine", cursive', fontSize: '2.5rem', fontWeight: 'bold' }}>{timeLeft.hours}</span>
              <span className="block mt-4" style={{ fontFamily: '"Tangerine", cursive', fontSize: '1.5rem', fontWeight: 'bold' }}>Horas</span>
            </div>
            <div>
              <span className="block text-gold-400" style={{ fontFamily: '"Tangerine", cursive', fontSize: '2.5rem', fontWeight: 'bold' }}>{timeLeft.minutes}</span>
              <span className="block mt-4" style={{ fontFamily: '"Tangerine", cursive', fontSize: '1.5rem', fontWeight: 'bold' }}>Minutos</span>
            </div>
            <div>
              <span className="block text-gold-400" style={{ fontFamily: '"Tangerine", cursive', fontSize: '2.5rem', fontWeight: 'bold' }}>{timeLeft.seconds}</span>
              <span className="block mt-4" style={{ fontFamily: '"Tangerine", cursive', fontSize: '1.5rem', fontWeight: 'bold' }}>Segundos</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
