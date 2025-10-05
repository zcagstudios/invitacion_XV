import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import { RSVPButtons } from './RSVPButtons';
import { Toaster } from './ui/toaster';
import { supabase } from '../lib/supabase';
import type { Invitado } from '../types';
import { RSVPStatus } from '../types';

const InvitadoComponent: React.FC = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const [invitado, setInvitado] = useState<Invitado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight / 2);

  useEffect(() => {
    const fetchInvitado = async () => {
      // Si no hay código, no intentar buscar
      if (!codigo) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('invitados')
        .select('*')
        .eq('codigo', codigo)
        .single();

      if (error) {
        setError('Error al cargar la información del invitado');
        setLoading(false);
      } else {
        setInvitado(data as Invitado);
        setLoading(false);
      }
    };

    fetchInvitado();
  }, [codigo]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight / 2);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConfirmar = async (status: RSVPStatus) => {
    if (invitado) {
      try {
        const { data, error } = await supabase
          .from('invitados')
          .update({ confirmado: status })
          .eq('id', invitado.id)
          .select();

        if (error) {
          console.error('Error al actualizar la confirmación:', error);
          setError('Error al actualizar. Por favor, verifica la configuración de Supabase.');
        } else {
          if (data && data.length > 0) {
            setInvitado(data[0] as Invitado);

            if (status === RSVPStatus.attending) {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            }
          }
        }
      } catch (err) {
        console.error('Error de red:', err);
        setError('Error de conexión. Verifica que Supabase esté configurado correctamente.');
      }
    }
  };

  if (loading) return <p className="text-gray-600 text-center p-8">Cargando...</p>;
  if (error) return <p className="text-red-600 text-center p-8">{error}</p>;
  if (!invitado) return null;

  const textoInvitacion = invitado.plural
    ? '¡Los queremos en nuestros XV años!'
    : '¡Te queremos en nuestros XV años!';
  const textoCantidadInvitados = invitado.plural ? 'Su invitación es para' : 'Tu invitación es para';

  return (
    <>
      {showConfetti && (
        <div style={{ position: 'fixed', top: '0%', left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
          <Confetti width={viewportWidth} height={viewportHeight} />
        </div>
      )}

      <div className="w-full max-w-2xl mb-6 flex justify-center mx-auto px-4">
        <RSVPButtons
          onStatusChange={(status) => handleConfirmar(status)}
          intStatus={invitado.confirmado}
        />
      </div>

      <div className="relative container mx-auto px-4 py-8 text-center max-w-lg">
        <div
          className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/50"
          style={{
            boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.2), 0 0 0 1px rgba(255, 215, 79, 0.3)',
          }}
        >
          <h2 className="text-gold-600 mb-4 font-script text-2xl">
            Estimado{invitado.plural ? 's' : ''}
          </h2>

          <h1
            className="text-gray-800 mb-4 font-script text-4xl font-bold rose-glow"
            style={{ lineHeight: '1.2' }}
          >
            {invitado.nombre}
          </h1>

          <p className="text-gray-700 font-serif text-xl mb-2">
            {textoInvitacion}
          </p>

          <p className="text-gray-600 font-serif text-lg">
            {textoCantidadInvitados} {' '}
            <span className="font-bold text-gold-600 text-2xl">{invitado.cantidad}</span> {' '}
            {invitado.cantidad === 1 ? 'persona' : 'personas'}.
          </p>

          <div className="mt-6 pt-6 border-t-2 border-gold-300">
            <p className="text-purple-600 font-script text-xl italic">
              "El cuento apenas comienza..."
            </p>
          </div>
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default InvitadoComponent;
