
import React from 'react';
import { ConnectionStatus } from '../types';
import { Icons } from '../constants';

interface ConnectButtonProps {
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ status, onConnect, onDisconnect }) => {
  const isConnecting = status === ConnectionStatus.CONNECTING;
  const isConnected = status === ConnectionStatus.CONNECTED;

  const handleClick = () => {
    if (isConnected) {
      onDisconnect();
    } else if (status === ConnectionStatus.DISCONNECTED) {
      onConnect();
    }
  };

  const buttonText = isConnected ? 'Disconnect' : isConnecting ? 'Connecting...' : 'Connect';
  
  const baseClasses = 'relative w-52 h-52 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100';
  const colorClasses = isConnected 
    ? 'bg-green-500/20 border-2 border-green-400 text-green-400 glow-connected' 
    : 'bg-blue-500/20 border-2 border-blue-400 text-blue-400 glow-disconnected';

  const Icon = isConnected ? Icons.ShieldCheck : Icons.ShieldExclamation;

  return (
    <button
      onClick={handleClick}
      disabled={isConnecting}
      className={`${baseClasses} ${colorClasses}`}
    >
      <div className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 flex flex-col items-center">
        {isConnecting ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-300 mb-2"></div>
        ) : (
            <Icon className="w-12 h-12 mb-2" />
        )}
        <span>{buttonText}</span>
      </div>
    </button>
  );
};

export default ConnectButton;
