import { Church, MapPin, Gift, Shirt, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Section from '../components/Section';
import Footer from '../components/Footer';
import Map from '../components/Map';
import UberButton from '../components/UberButton';
import AccountModal from '../components/Account';
import InvitadoComponent from '../components/Invitado';
import Separador from '../components/Separador';

function Principal() {
  return (
    <div className="min-h-screen text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <InvitadoComponent />
        <Separador />

        {/* Sección Misa */}
        <Section
          icon={<Church className="w-12 h-12 text-purple-600" />}
          title="Ceremonia Religiosa"
          content="Los invitamos a acompañarnos en nuestra misa de acción de gracias, donde celebraremos este momento tan especial en nuestras vidas."
          horario="7:00 PM"
          direccion="Parroquia María Madre del Redentor, C. Simon Bley, Hab Jardines, 83113 Hermosillo, Son."
          imageUrl="/iglesia.png"
          subcomponente={
            <div className="flex flex-row justify-center items-center gap-3 mt-6">
              <Map
                buttonText="Ver Ubicación"
                mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.2422461425235!2d-110.98362752350869!3d29.128044475397804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ce86c72f885b45%3A0xbfa0df62b04a1094!2sParroquia%20Mar%C3%ADa%2C%20Madre%20del%20Redentor!5e0!3m2!1ses!2smx!4v1728787725150!5m2!1ses!2smx"
              />
              <UberButton
                destination="Parroquia Maria Madre Del Redentor"
                latitude={29.1281057}
                longitude={-110.9812662}
                buttonText="Solicitar Uber"
              />
            </div>
          }
        />

        <Separador />

        {/* Sección Recepción */}
        <Section
          icon={<MapPin className="w-12 h-12 text-gold-600" />}
          title="Recepción"
          content="Después de la ceremonia religiosa, los esperamos para celebrar juntos esta noche mágica llena de alegría, música y buenos momentos."
          horario="8:00 PM - 1:00 AM"
          direccion="Callejo, Av. José María Mendoza 261, Balderrama, 83180 Hermosillo, Son."
          imageUrl="/recepcion.png"
          subcomponente={
            <div className="flex flex-row justify-center items-center gap-3 mt-6">
              <Map
                buttonText="Ver Ubicación"
                mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.5882308773!2d-110.97427578!3d29.104889899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145da3100334f537%3A0xb523c20011413ddc!2sFestivals%20of%20Remembrance!5e0!3m2!1sen!2smx!4v1234567890"
              />
              <UberButton
                destination="Fiestas del Recuerdo"
                latitude={29.1048852}
                longitude={-110.9717009}
                buttonText="Solicitar Uber"
              />
            </div>
          }
        />

        <Separador />

        {/* Sección Código de Vestimenta */}
        <Section
          icon={<Shirt className="w-12 h-12 text-purple-600" />}
          title="Código de Vestimenta"
          content="Nos encantaría que nuestros invitados vistan de forma elegante. ¡Ven con tu mejor atuendo formal!"
          imageUrl="/vestimenta.png"
        />

        <Separador />

        {/* Sección Regalos */}
        <Section
          icon={<Gift className="w-12 h-12 text-purple-600" />}
          title="Mesa de Regalos"
          content="Tu presencia es nuestro mejor regalo. Sin embargo, si deseas obsequiarnos algo, agradecemos una aportación en efectivo que nos ayudará a cumplir nuestros sueños."
          imageUrl="/regalos.png"
          subcomponente={
            <div className="flex justify-center mt-6">
              <AccountModal />
            </div>
          }
          content2="También puedes llevar tu regalo el día de la fiesta. Tendremos un cofre especial para recibirlos."
        />

        <Separador />

        {/* Sección Confirmación */}
        <Section
          icon={<Calendar className="w-12 h-12 text-gold-600" />}
          title="Confirmación de Asistencia"
          content="Por favor, confirma tu asistencia lo antes posible usando los botones de arriba. ¡Tu confirmación es muy importante para nosotros!"
        />
      </main>
      <Footer />
    </div>
  );
}

export default Principal;
