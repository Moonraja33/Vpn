
import React from 'react';
import { ConnectionStatus } from '../types';

interface StatusDisplayProps {
  status: ConnectionStatus;
  connectionTime: number;
  ip: string;
  serverName: string;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, connectionTime, ip, serverName }) => {
    
  const statusInfo = {
    [ConnectionStatus.CONNECTED]: { text: 'Secured', color: 'text-green-400' },
    [ConnectionStatus.CONNECTING]: { text: 'Securing...', color: 'text-yellow-400' },
    [ConnectionStatus.DISCONNECTED]: { text: 'Not Secured', color: 'text-red-400' },
  };

  const { text, color } = statusInfo[status];

  return (
    <div className="text-center space-y-3 w-full">
      <p className={`text-2xl font-bold ${color}`}>{text}</p>
      <div className="text-sm text-gray-400">
        <p>Your IP: <span className="font-semibold text-gray-200">{ip}</span></p>
        {status === ConnectionStatus.CONNECTED && (
          <>
            <p>Server: <span className="font-semibold text-gray-200">{serverName}</span></p>
            <p>Duration: <span className="font-semibold text-gray-200">{formatTime(connectionTime)}</span></p>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusDisplay;
