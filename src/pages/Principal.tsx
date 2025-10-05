import React from 'react';
import { Church, Clock, MapPin, Gift, Camera, FileText, Wine, Shirt } from 'lucide-react';
import Header from '../components/Header';
import Section from '../components/Section';
import Footer from '../components/Footer';
import Map from '../components/Map';
import Gallery from '../components/Gallery';
import UberButton from '../components/UberButton';
import AccountModal from '../components/Account';
import InvitadoComponent from '../components/Invitado';
import Separador from '../components/Separador';

function App() {
  return (
    <div className="min-h-screen bg-rose-50 text-gray-800 font-serif header-marco-dark-no-bottom">
      <Header />
      <main
        className="container mx-auto px-4 py-8"
        style={{
          backgroundImage: 'url("../../texturas/4.jpeg")', // Imagen de fondo como textura
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat', // Repetir la imagen para evitar estiramiento
          backgroundSize: 'auto', // Ajuste automático del tamaño para evitar distorsión
          boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)',  // Sombra más fuerte
        }}
      >
        <InvitadoComponent />
        <Separador />
        {/* Sección Boda Iglesia */}
        <Section
          icon={<Church className="w-8 h-8 text-rose-500" />}
          title="Boda Iglesia"
          content="Acompáñanos en nuestra ceremonia religiosa en la Parroquia María Madre del Redentor, donde daremos nuestro sí para siempre."
          horario="2:00 PM"
          direccion="C. Simon Bley, Hab Jardines, 83113 Hermosillo, Son."
          imageUrl="/fotos_secciones/iglesia.jpeg"
          imagePosition="below" // Posición de la imagen: 'left', 'right' o 'below'
        />
   
        {/* Mapa y Uber para la Iglesia */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <Map
            buttonText="Ver Mapa"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.2422461425235!2d-110.98362752350869!3d29.128044475397804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce86c72f885b45%3A0xbfa0df62b04a1094!2sParroquia%20Mar%C3%ADa%2C%20Madre%20del%20Redentor!5e0!3m2!1ses!2smx!4v1728787725150!5m2!1ses!2smx"
          />
          <UberButton
            destination="Parroquia Maria Madre Del Redentor"
            latitude={29.1281057}
            longitude={-110.9812662}
            buttonText="Solicitar Uber"
          />
        </div>
        <Separador />
        {/* Sección Ceremonia Civil */}
        <Section
          icon={<FileText className="w-8 h-8 text-rose-500" />}
          title="Boda Civil"
          content="Ceremonia civil en Madero Ranch."
          horario="7:00 PM"
          direccion="Salón de Eventos Madero Ranch, Calle Cerro De Los Molinos 215, 83285 Hermosillo, Son."
          imageUrl="/fotos_secciones/madero_ranch1.png"
          imagePosition="below" // Posición de la imagen: 'left', 'right' o 'below'
        />
        <Separador />
        {/* Sección Recepción/Fiesta */}
        <Section
          icon={<Wine className="w-8 h-8 text-rose-500" />}
          title="Recepción y Fiesta"
          content="Después de la ceremonia civil, acompáñanos a celebrar en Madero Ranch una noche llena de alegría, música y crear buenos recuerdos."
          horario="A partir de las 8:00 PM"
          imageUrl="/fotos_secciones/madero_ranch2.png"
          imagePosition="below" // Posición de la imagen: 'left', 'right' o 'below'
        />

        {/* Mapa y Uber para Madero Ranch */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <Map
            buttonText="Ver Mapa"
            mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11730.899909526646!2d-110.99711625928691!3d29.057895246425225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce850078497e47%3A0xd46d32e72888fcd9!2sMadero%20Ranch!5e0!3m2!1ses!2smx!4v1728772718962!5m2!1ses!2smx"
          />
          <UberButton
            destination="Madero Ranch"
            latitude={29.052921}
            longitude={-110.9907186}
            buttonText="Solicitar Uber"
          />
        </div>
        <Separador />
        <Section
          icon={<Shirt className="w-8 h-8 text-rose-500" />} // Ícono de vestimenta
          title="Vestimenta"
          content="Nos encantaría que nuestros invitados vistan de manera formal, pero con un toque vaquero para darle un estilo único a nuestra celebración. ¡Las botas y el sombrero son bienvenidos!"
          imageUrl="/fotos_secciones/vestimenta.png"
          imagePosition="below" // Posición de la imagen: 'left', 'right' o 'below'
        />
        <Separador />
        {/* Otras Secciones */}
        <Section
          icon={<Gift className="w-8 h-8 text-rose-500" />}
          title="Regalo"
          content="Tu presencia es el mejor regalo que podríamos recibir. Sin embargo, si deseas hacernos un obsequio adicional, te agradecemos de corazón una contribución que nos será de gran ayuda en esta nueva etapa, esto lo puedes hacer mediante una transferencia."
          imageUrl="/fotos_secciones/cofre.png"
          imagePosition="below" // Posición de la imagen: 'left', 'right' o 'below',
          subcomponente={
            <div className="flex justify-center mb-8 mt-1">
              <AccountModal />
            </div>
          }
          content2="O si lo prefieres, el día de la boda tendremos un cofre y sobres donde podrás dejar tu regalo."
        />
        <Separador />
        <Section
          icon={<Camera className="w-8 h-8 text-rose-500" />}
          title="Galería de Fotos"
          content="Save the Date 02.10.2024 en Madero Ranch"
          imageUrl="/fotos_secciones/galeria.jpg"
          imagePosition="below" // Posición de la imagen: 'left', 'right' o 'below'
        />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

export default App;
