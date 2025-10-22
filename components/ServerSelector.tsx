
import React, { useState } from 'react';
import { Server } from '../types';
import { Icons } from '../constants';

interface ServerSelectorProps {
  servers: Server[];
  selectedServer: Server;
  onSelectServer: (server: Server) => void;
  disabled: boolean;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ servers, selectedServer, onSelectServer, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (server: Server) => {
    onSelectServer(server);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between transition-colors duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center">
          <img src={`https://flagcdn.com/w20/${selectedServer.countryCode.toLowerCase()}.png`} alt={selectedServer.name} className="w-5 h-auto mr-3"/>
          <span className="font-semibold text-gray-200">{selectedServer.name}</span>
        </div>
        <Icons.ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-[#161B22] border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fade-in-down">
          <ul>
            {servers.map((server) => (
              <li
                key={server.id}
                onClick={() => handleSelect(server)}
                className="px-4 py-3 flex items-center cursor-pointer hover:bg-blue-500/10 transition-colors duration-200"
              >
                <img src={`https://flagcdn.com/w20/${server.countryCode.toLowerCase()}.png`} alt={server.name} className="w-5 h-auto mr-3"/>
                <span className="text-gray-300">{server.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServerSelector;
