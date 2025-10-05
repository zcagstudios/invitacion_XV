import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  icon?: React.ReactNode;
  title: string;
  content: string;
  content2?: string;
  horario?: string;
  direccion?: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right' | 'below';
  subcomponente?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  icon,
  title,
  content,
  content2,
  horario,
  direccion,
  imageUrl,
  imagePosition = 'below',
  subcomponente,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-12 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/40"
      style={{
        boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.15)',
      }}
    >
      <div className="flex flex-col items-center text-center">
        {icon && <div className="mb-4">{icon}</div>}

        <h2 className="text-3xl font-script text-purple-600 mb-4 font-bold">
          {title}
        </h2>

        <p className="text-gray-700 mb-4 font-serif text-lg max-w-2xl">
          {content}
        </p>

        {horario && (
          <div className="mb-3 bg-gold-100 px-6 py-3 rounded-lg border border-gold-400">
            <p className="text-gray-800 font-semibold">
              <span className="text-gold-600">🕐</span> {horario}
            </p>
          </div>
        )}

        {direccion && (
          <div className="mb-4 bg-purple-50 px-6 py-3 rounded-lg border border-purple-300">
            <p className="text-gray-700 font-serif text-sm">
              <span className="text-purple-600">📍</span> {direccion}
            </p>
          </div>
        )}

        {imageUrl && imagePosition === 'below' && (
          <div className="mt-6 w-full max-w-2xl">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-auto rounded-lg shadow-md border-4 border-gold-300"
            />
          </div>
        )}

        {subcomponente && (
          <div className="mt-6 w-full">{subcomponente}</div>
        )}

        {content2 && (
          <p className="text-gray-600 mt-4 font-serif italic">
            {content2}
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default Section;
