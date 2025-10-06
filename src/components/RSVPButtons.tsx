import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { RSVPStatus } from '../types';
import { useToast } from './ui/use-toast';

interface RSVPButtonsProps {
  onStatusChange: (status: RSVPStatus) => void;
  intStatus: RSVPStatus;
}

export const RSVPButtons: React.FC<RSVPButtonsProps> = ({ onStatusChange, intStatus }) => {
  const { toast } = useToast();

  const handleValueChange = (value: string) => {
    const status = value as RSVPStatus;
    onStatusChange(status);

    if (status === RSVPStatus.attending) {
      toast({
        title: '¡Confirmado! 🎉',
        description: '¡Nos vemos en la fiesta de XV años!',
      });
    } else if (status === RSVPStatus.notAttending) {
      toast({
        title: 'Confirmación recibida',
        description: 'Lamentamos que no puedas asistir.',
      });
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-script text-purple-700 mb-2 font-bold">
          ¿Confirmas tu asistencia?
        </h3>
      </div>
      <RadioGroup
        value={intStatus}
        onValueChange={handleValueChange}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <Label
          htmlFor="si"
          className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-green-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          <RadioGroupItem value={RSVPStatus.attending} id="si" />
          <span className="text-base font-medium text-green-700">
            ✓ Sí asistiré
          </span>
        </Label>

        <Label
          htmlFor="pendiente"
          className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-gold-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          <RadioGroupItem value={RSVPStatus.pending} id="pendiente" />
          <span className="text-base font-medium text-gold-700">
            ⏳ Pendiente
          </span>
        </Label>

        <Label
          htmlFor="no"
          className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-red-300/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          <RadioGroupItem value={RSVPStatus.notAttending} id="no" />
          <span className="text-base font-medium text-red-700">
            ✗ No asistiré
          </span>
        </Label>
      </RadioGroup>
    </div>
  );
};
