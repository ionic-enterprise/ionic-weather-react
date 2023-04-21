import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import WeatherProvider from './services/api/WeatherProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
);
