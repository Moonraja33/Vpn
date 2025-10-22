
import React from 'react';
import { Server } from './types';

export const SERVERS: Server[] = [
  { id: 'us', name: 'United States', countryCode: 'US', ip: '104.26.10.188', coords: { x: 235, y: 135 } },
  { id: 'de', name: 'Germany', countryCode: 'DE', ip: '194.163.144.13', coords: { x: 470, y: 110 } },
  { id: 'jp', name: 'Japan', countryCode: 'JP', ip: '103.245.222.19', coords: { x: 780, y: 140 } },
  { id: 'au', name: 'Australia', countryCode: 'AU', ip: '101.0.80.25', coords: { x: 790, y: 280 } },
  { id: 'br', name: 'Brazil', countryCode: 'BR', ip: '177.54.148.1', coords: { x: 340, y: 250 } },
];

export const USER_COORDS = { x: 180, y: 120 }; // Mock user location (e.g., West Coast US)

export const Icons = {
  ShieldCheck: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a12.02 12.02 0 009 2.045 12.02 12.02 0 009-2.045c0-2.622-.68-5.125-1.955-7.37z" />
    </svg>
  ),
  ShieldExclamation: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a12.02 12.02 0 009 2.045 12.02 12.02 0 009-2.045c0-2.622-.68-5.125-1.955-7.37z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01" />
    </svg>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
};
