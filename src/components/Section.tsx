import React, { ReactNode } from 'react';

interface SectionProps {
  icon?: ReactNode;      // Ícono opcional
  title: string;         // Título
  subtitle?: string;     // Subtítulo opcional
  content: string;       // Contenido principal
  horario?: string;      // Horario opcional
  direccion?: string;    // Dirección opcional
  imageUrl?: string;     // Imagen opcional
  imagePosition?: 'below' | 'right' | 'left'; // Posición de la imagen opcional
  subcomponente?: ReactNode; // Subcomponente opcional para renderizar debajo del contenido
  content2?: string;       // Contenido adicional
}

const Section: React.FC<SectionProps> = ({ 
  icon, 
  title, 
  subtitle, 
  content, 
  horario, 
  direccion, 
  imageUrl,
  imagePosition = 'below',
  subcomponente,
  content2
}) => {
  return (
    <section
      className={`mb-12 p-8 rounded-lg shadow-lg relative flex ${
        imagePosition === 'right' ? 'flex-row' 
        : imagePosition === 'left' ? 'flex-row-reverse' 
        : 'flex-col'
      } items-center text-center`}
      style={{
        background: 'url("../texturas/2.jpeg") center/cover no-repeat', // Imagen de fondo como textura
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      }}
    >

      {/* Imagen opcional en las posiciones "right" o "left" */}
      {imageUrl && (imagePosition === 'right' || imagePosition === 'left') && (
        <div className="w-1/3 ml-4 mr-4">
          <img
            src={imageUrl}
            alt="Imagen sección"
            className="rounded-xl shadow-md w-full h-auto object-cover border-4 border-black"
            style={{
              maskImage: 'radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0.7) 70%, transparent)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0.7) 70%, transparent)',
              borderRadius: '12px',
            }}
          />
        </div>
      )}

      <div className="flex-1 mb-4 text-left">

        {/* Contenido del texto */}
        <div className="flex items-center justify-center px-2 py-2 rounded-lg relative">
          <h2 className="text-xl font-serif text-gray-800 tracking-wide leading-tight text-center" style={{ fontFamily: '"Tangerine", cursive', fontSize: '2.5rem', fontWeight: 'bold' }}>
            {title}
          </h2>
        </div>

        {/* Subtítulo opcional */}
        {subtitle && (
          <h3 className="text-2xl font-semibold text-rose-500 italic mt-2 text-center" style={{ fontFamily: '"Tangerine", cursive' }}>
            {subtitle}
          </h3>
        )}

        {/* Divisor superior */}
        <div className="w-full mb-4 flex justify-center mt-4">
          <img src="../marco-up.png" alt="Divisor superior" className="w-auto h-12" />
        </div>

        {/* Contenido */}
        <p className="text-lg font-light text-gray-600 mt-4 text-center" style={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.75', fontSize: '1.3rem' }}>
          {content}
        </p>
        
        {/* Renderización del subcomponente */}
        {subcomponente && (
          <div className="mt-8">
            {subcomponente}
          </div>
        )}

        {/* Contenido adicional */}
        <p className="text-lg font-light text-gray-600 mt-4 text-center" style={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.75', fontSize: '1.3rem' }}>
          {content2}
        </p>

        {/* Horario opcional */}
        {horario && (
          <p className="text-md font-extrabold text-gray-600 mt-2 text-center">
            <span className="font-medium text-rose-600 italic" 
            style={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.75', fontSize: '1.25rem', fontWeight:'bolder' }}>Horario: </span> <br/>
            <span className='font-light text-gray-600'
              style={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.75', fontSize: '1.25rem' }}>{horario}</span>
          </p>
        )}

        {/* Dirección opcional */}
        {direccion && (
          <p className="text-md font-extrabold text-gray-600 mt-2 text-center">
            <span className="font-medium text-rose-600 italic" 
            style={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.75', fontSize: '1.25rem', fontWeight:'bolder' }}>Dirección: </span> <br/>
            <span className='font-light text-gray-600'
              style={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: '1.75', fontSize: '1.25rem' }}>{direccion}</span>
          </p>
        )}

        {/* Divisor inferior */}
        <div className="w-full mt-4 flex justify-center">
          <img src="../marco-down.png" alt="Divisor inferior" className="w-auto h-12" />
        </div>
      </div>

      {/* Imagen en la posición "below" */}
      {imageUrl && imagePosition === 'below' && (
        <div className="w-full mt-4"> 
          <img
            src={imageUrl}
            alt="Imagen sección"
            className="rounded-xl shadow-md w-full h-auto object-cover"
            style={{
              borderRadius: '12px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.6)',
            }}
            
                   
          />
        </div>
      )}
    </section>
  );
};

export default Section;
