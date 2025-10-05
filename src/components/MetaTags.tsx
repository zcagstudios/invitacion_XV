import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Inicializar el cliente de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Invitado {
  id: number;
  nombre: string;
  cantidad: number;
  codigo: string;
  confirmado: boolean;
  plural: boolean; // Nuevo campo que indica si el mensaje debe estar en plural
}

const MetaTags: React.FC = () => {
  const { codigo } = useParams<{ codigo: string }>(); // Captura el código del invitado desde la URL
  const [invitado, setInvitado] = useState<Invitado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvitado = async () => {
      try {
        // Consultar a Supabase para obtener los datos del invitado según el código
        const { data, error } = await supabase
          .from('invitados')
          .select('*')
          .eq('codigo', codigo)
          .single();

        if (error) {
          console.error('Error al obtener el invitado:', error);
        } else {
          setInvitado(data as Invitado);
        }
      } catch (err) {
        console.error('Error de conexión:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitado();
  }, [codigo]);

  if (loading || !invitado) {
    return null; // Opcional: podrías mostrar un loader mientras se cargan los datos
  }

  // Funciones para obtener los textos dinámicos basados en el valor de 'plural'
  const getTitle = () => {
    return invitado.plural
      ? `¡Los invitamos a nuestra boda, ${invitado.nombre}! Ángel & Ely - 07.12.2024`
      : `¡Te invitamos a nuestra boda, ${invitado.nombre}! Ángel & Ely - 07.12.2024`;
  };

  const getDescription = () => {
    return invitado.plural
      ? `¡${invitado.nombre}, estamos muy emocionados de compartir este día tan especial con ustedes! No olviden confirmar su asistencia.`
      : `¡${invitado.nombre}, estamos muy emocionados de compartir este día tan especial contigo! No olvides confirmar tu asistencia.`;
  };

  return (
    <Helmet>
      {/* Título dinámico basado en el nombre del invitado y el valor de 'plural' */}
      <meta property="og:title" content={getTitle()} />

      {/* Descripción dinámica basada en el nombre del invitado y el valor de 'plural' */}
      <meta property="og:description" content={getDescription()} />

      {/* Imagen de portada */}
      <meta property="og:image" content="https://angelyely.com/portada.jpg" />

      {/* Otros metadatos */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://angelyely.com/invitado/${codigo}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Ángel & Ely - Nuestra Boda - 07.12.2024" />

      {/* Meta tags básicos */}
      <meta name="description" content={getDescription()} />
      <meta name="keywords" content="boda, invitación, Ángel, Ely, fiesta" />
    </Helmet>
  );
};

export default MetaTags;
