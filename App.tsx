
import React, { useState, useEffect, useCallback } from 'react';
import { Server, ConnectionStatus } from './types';
import { SERVERS, USER_COORDS } from './constants';
import ConnectButton from './components/ConnectButton';
import ServerSelector from './components/ServerSelector';
import StatusDisplay from './components/StatusDisplay';
import SpeedChart from './components/SpeedChart';
import WorldMap from './components/WorldMap';

const App: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [connectionTime, setConnectionTime] = useState<number>(0);
  const [currentIp, setCurrentIp] = useState<string>('192.168.1.101');

  const handleConnect = useCallback(() => {
    setStatus(ConnectionStatus.CONNECTING);
    setTimeout(() => {
      setStatus(ConnectionStatus.CONNECTED);
      setCurrentIp(selectedServer.ip);
      setConnectionTime(0);
    }, 2000);
  }, [selectedServer]);

  const handleDisconnect = useCallback(() => {
    setStatus(ConnectionStatus.DISCONNECTED);
    setCurrentIp('192.168.1.101');
    setConnectionTime(0);
  }, []);

  useEffect(() => {
    // Fix: Use ReturnType<typeof setInterval> for the timer type instead of NodeJS.Timeout, which is not available in the browser environment.
    let timer: ReturnType<typeof setInterval>;
    if (status === ConnectionStatus.CONNECTED) {
      timer = setInterval(() => {
        setConnectionTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [status]);

  const isConnected = status === ConnectionStatus.CONNECTED;

  return (
    <div className="bg-[#0D1117] text-gray-200 min-h-screen flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100 tracking-wider">VPN Lite</h1>
          <p className="text-blue-400">Your simulated secure connection</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center justify-center space-y-6 bg-[#161B22] p-8 rounded-2xl border border-gray-700">
            <StatusDisplay status={status} connectionTime={connectionTime} ip={currentIp} serverName={selectedServer.name} />
            <ServerSelector 
              servers={SERVERS} 
              selectedServer={selectedServer} 
              onSelectServer={setSelectedServer} 
              disabled={status !== ConnectionStatus.DISCONNECTED}
            />
            <ConnectButton 
              status={status} 
              onConnect={handleConnect} 
              onDisconnect={handleDisconnect} 
            />
          </div>
          
          <div className="flex flex-col space-y-8">
            <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-700 h-64 flex flex-col justify-center">
                <h3 className="text-lg text-center font-semibold mb-2 text-gray-400">Connection Path</h3>
                <WorldMap 
                  userCoords={USER_COORDS}
                  serverCoords={isConnected ? selectedServer.coords : null}
                />
            </div>
             <div className="bg-[#161B22] p-6 rounded-2xl border border-gray-700 h-64 flex flex-col justify-center">
                <h3 className="text-lg text-center font-semibold mb-2 text-gray-400">Live Traffic</h3>
                <SpeedChart isConnected={isConnected} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;