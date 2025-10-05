import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/roadio-group';
import { Label } from './ui/label';
import { HeartIcon, CalendarX, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from '../hook/use-toast';

enum RSVPStatus {
  attending = 'Si',
  pending = 'Pendiente',
  notAttending = 'No',
}

interface RSVPButtonsProps {
  onStatusChange?: (status: RSVPStatus) => void;
  intStatus: RSVPStatus
}

export function RSVPButtons({ onStatusChange, intStatus }: RSVPButtonsProps) {
  const [status, setStatus] = useState<RSVPStatus>(intStatus);
  const { toast } = useToast();

  const handleStatusChange = (value: string) => {
    const newStatus = value as RSVPStatus;
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  
    // Mapeo entre el enum RSVPStatus y las claves de los objetos `messages` e `icons`
    const statusKeyMap: Record<RSVPStatus, 'attending' | 'pending' | 'not-attending'> = {
      [RSVPStatus.attending]: 'attending',
      [RSVPStatus.pending]: 'pending',
      [RSVPStatus.notAttending]: 'not-attending',
    };
  
    const messages = {
      attending: '¡Gracias por confirmar su asistencia! Los esperamos con mucho gusto.',
      pending: 'Entendemos que necesita tiempo para decidir. Por favor confírmenos pronto.',
      'not-attending': 'Lamentamos que no puedan acompañarnos. ¡Gracias por avisarnos!',
    };
  
    const icons = {
      attending: '💝',
      pending: '⏳',
      'not-attending': '💌',
    };
  
    const statusKey = statusKeyMap[newStatus]; // Usamos el mapeo aquí
  
    toast({
      title: `${icons[statusKey]} Estado actualizado`,
      description: messages[statusKey],
      duration: 4000,
      className: "fixed bottom-5 left-1/2 -translate-x-1/2 text-center rounded-lg",
    });
  };

  return (
    <RadioGroup
      value={status}
      onValueChange={handleStatusChange}
      className="w-full"
    >
      <div className="grid grid-cols-3 gap-2">
        <div className={cn(
          'relative overflow-hidden rounded-lg transition-all duration-300 h-16',
          status === RSVPStatus.notAttending ? 'ring-2 ring-red-400' : ''
        )}>
          <RadioGroupItem
            value="No"
            id="not-attending"
            className="peer sr-only"
          />
          <Label
            htmlFor="not-attending"
            className={cn(
              "flex flex-col items-center justify-center h-full cursor-pointer bg-white bg-opacity-90 hover:bg-red-50 transition-colors",
              status === RSVPStatus.notAttending ? 'bg-red-300' : ''
            )}
          >
            <CalendarX className={cn(
              "h-6 w-6 mb-2",
              status === RSVPStatus.notAttending ? 'text-red-500' : 'text-red-400'
            )} />
            <span className="text-sm font-medium text-gray-700">No Asistiré</span>
          </Label>
        </div>

        <div className={cn(
          'relative overflow-hidden rounded-lg transition-all duration-300 h-16',
          status === RSVPStatus.pending ? 'ring-2 ring-amber-400' : ''
        )}>
          <RadioGroupItem
            value="Pendiente"
            id="pending"
            className="peer sr-only"
          />
          <Label
            htmlFor="pending"
            className={cn(
              "flex flex-col items-center justify-center h-full cursor-pointer bg-white bg-opacity-90 hover:bg-amber-50 transition-colors",
              status === RSVPStatus.pending ? 'bg-yellow-300' : ''
            )}
          >
            <Clock className={cn(
              "h-6 w-6 mb-2",
              status === RSVPStatus.pending ? 'text-amber-500' : 'text-amber-400'
            )} />
            <span className="text-sm font-medium text-gray-700">Pendiente</span>
          </Label>
        </div>

        <div className={cn(
          'relative overflow-hidden rounded-lg transition-all duration-300 h-16',
          status === RSVPStatus.attending ? 'ring-2 ring-rose-400' : ''
        )}>
          <RadioGroupItem
            value="Si"
            id="attending"
            className="peer sr-only"
          />
          <Label
            htmlFor="attending"
            className={cn(
              "flex flex-col items-center justify-center h-full cursor-pointer bg-white bg-opacity-90 hover:bg-rose-50 transition-colors",
              status === RSVPStatus.attending ? 'bg-green-300' : ''
            )}
          >
            <HeartIcon className={cn(
              "h-6 w-6 mb-2",
              status === RSVPStatus.attending ? 'text-rose-500' : 'text-rose-400'
            )} />
            <span className="text-sm font-medium text-gray-700">Asistiré</span>
          </Label>
        </div>
      </div>
    </RadioGroup>
  );
}