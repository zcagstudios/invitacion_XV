export interface Invitado {
  id: number;
  nombre: string;
  cantidad: number;
  codigo: string;
  confirmado: RSVPStatus;
  plural: boolean;
  parte: 'Marcelo' | 'Marcela';
}

export enum RSVPStatus {
  attending = 'Si',
  pending = 'Pendiente',
  notAttending = 'No',
}
