import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DanceStudio from './DanceStudio';
import Team from './Team';
import Apply from './Apply';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const path = window.location.pathname.replace(/\/+$/, '');
const isDanceStudio = path === '/dance-studio';
const isTeam = path === '/team';
const isApply = path === '/apply';

if (isDanceStudio) {
  document.body.style.backgroundColor = '#ffffff';
  document.body.style.color = '#1f2937';
  document.body.style.fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {isDanceStudio ? <DanceStudio /> : isTeam ? <Team /> : isApply ? <Apply /> : <App />}
  </React.StrictMode>
);
