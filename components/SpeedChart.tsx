
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartData {
  time: string;
  download: number;
  upload: number;
}

interface SpeedChartProps {
  isConnected: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800/80 p-2 border border-gray-700 rounded-md text-sm">
        <p className="label text-gray-400">{`${label}`}</p>
        <p className="intro text-cyan-400">{`Download : ${payload[0].value.toFixed(2)} Mbps`}</p>
        <p className="intro text-fuchsia-400">{`Upload : ${payload[1].value.toFixed(2)} Mbps`}</p>
      </div>
    );
  }
  return null;
};

const SpeedChart: React.FC<SpeedChartProps> = ({ isConnected }) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const initialData = Array(10).fill(null).map((_, i) => ({
        time: `${10-i}s ago`,
        download: 0,
        upload: 0,
    }));
    setData(initialData);
  }, []);

  useEffect(() => {
    // Fix: Use ReturnType<typeof setInterval> for the interval type instead of NodeJS.Timeout, which is not available in the browser environment.
    let interval: ReturnType<typeof setInterval>;

    if (isConnected) {
      interval = setInterval(() => {
        setData(prevData => {
          const now = new Date();
          const newEntry = {
            time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
            download: Math.random() * 80 + 10, // 10-90 Mbps
            upload: Math.random() * 20 + 5,   // 5-25 Mbps
          };
          const newData = [...prevData.slice(1), newEntry];
          return newData;
        });
      }, 2000);
    } else {
        setData(prevData => prevData.map(d => ({...d, download: 0, upload: 0})));
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isConnected]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" tick={{ fill: '#9ca3af', fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} tickLine={false} axisLine={false} unit="M" />
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="download" stroke="#22d3ee" fillOpacity={1} fill="url(#colorDownload)" strokeWidth={2} />
        <Area type="monotone" dataKey="upload" stroke="#d946ef" fillOpacity={1} fill="url(#colorUpload)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SpeedChart;