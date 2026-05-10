import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DanceStudio from './DanceStudio';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const isDanceStudio = window.location.pathname.replace(/\/+$/, '') === '/dance-studio';

if (isDanceStudio) {
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.color = '#1f2937';
  document.body.style.fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {isDanceStudio ? <DanceStudio /> : <App />}
  </React.StrictMode>
);