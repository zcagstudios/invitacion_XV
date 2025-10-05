export interface Invitado {
  id: number;
  nombre: string;
  cantidad: number;
  codigo: string;
  confirmado: RSVPStatus;
  plural: boolean;
  parte: 'Marcelo' | 'Marcela';
}

export const RSVPStatus = {
  attending: 'Si',
  pending: 'Pendiente',
  notAttending: 'No',
} as const;

export type RSVPStatus = typeof RSVPStatus[keyof typeof RSVPStatus];
