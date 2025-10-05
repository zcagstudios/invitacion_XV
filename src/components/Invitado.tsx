import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Confetti from 'react-confetti';
import { RSVPButtons } from './RSVPButtons';
import { Toaster } from './ui/toaster';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Invitado {
  id: number;
  nombre: string;
  cantidad: number;
  codigo: string;
  confirmado: RSVPStatus;
  plural: boolean;
}

enum RSVPStatus {
  attending = 'Si',
  pending = 'Pendiente',
  notAttending = 'No',
}

const InvitadoComponent: React.FC = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const [invitado, setInvitado] = useState<Invitado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight / 2); // Solo la mitad del viewport
  useEffect(() => {
    const fetchInvitado = async () => {
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
      setViewportHeight(window.innerHeight / 2); // Solo la mitad del viewport
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleConfirmar = async (status: RSVPStatus) => {
    if (invitado) {
      const { data, error } = await supabase
        .from('invitados')
        .update({ confirmado: status })
        .eq('id', invitado.id)
        .select();

      if (error) {
        console.error('Error al actualizar la confirmación:', error);
      } else {
        if (data && data.length > 0) {
          setInvitado(data[0] as Invitado);

          if (status === RSVPStatus.attending) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }
        } else {
          console.error('Error: No se devolvió ningún dato después de la actualización');
        }
      }
    }
  };

  if (loading) return <p className="text-gray-600">Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!invitado) return null;

  const textoInvitacion = invitado.plural ? '¡Los queremos en nuestra boda!' : '¡Te queremos en nuestra boda!';
  const textoCantidadInvitados = invitado.plural ? 'Su invitación es para' : 'Tu invitación es para';

  return (
    <>
      {showConfetti && (
        <div style={{ position: 'fixed', top: '0%', left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
          <Confetti width={viewportWidth} height={viewportHeight} />
        </div>
      )}

      <div className="w-full max-w-md mb-6 flex justify-center mx-auto">
        <RSVPButtons 
          onStatusChange={(status) => {handleConfirmar(status)}}
          intStatus={invitado.confirmado}
        />
      </div>

      <div
        className="relative container mx-auto px-4 py-8 text-center max-w-sm bg-inherit p-6 h-[350px]"
        style={{
          backgroundImage: 'url(/sobre2.png)', 
          backgroundSize: 'cover',
          borderRadius: '15px',
          padding: '1.5rem',
        }}
      >
        
        
        <h1 
          className="text-gray-800 mt-12 mb-2"  
          style={{ 
            fontFamily: '"Tangerine", cursive', 
            fontSize: '2rem', 
            fontWeight: 'bolder', 
            lineHeight: '.8',
            textShadow: '0px 0px 3px #ffffff, 0px 0px 10px #ffffff'  // Sombra blanca al contorno
          }}
        >
          {invitado.nombre}
        </h1>

        <p className="text-gray-700" style={{ fontFamily: '"Tangerine", cursive', fontSize: '1.8rem', lineHeight: '.8' }}>
          {textoInvitacion}
        </p>
        <p className=" text-gray-600" style={{ fontFamily: '"Tangerine", cursive', fontSize: '1.8rem', lineHeight: '.8' }}>
          {textoCantidadInvitados} <span style={{ fontFamily: '"Tangerine", cursive', fontSize: '2.15rem', fontWeight: 'bold' }}>{invitado.cantidad}</span> {invitado.cantidad === 1 ? 'persona' : 'personas'}.
        </p>

        
        <Toaster />
      </div>
    </>
  );
};

export default InvitadoComponent;
