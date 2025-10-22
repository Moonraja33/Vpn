
export interface Server {
  id: string;
  name: string;
  countryCode: string;
  ip: string;
  coords: { x: number; y: number };
}

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
}
