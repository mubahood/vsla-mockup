import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialize token manager
import tokenManager from './utils/TokenManager';

// Import debug utilities in development
if (process.env.NODE_ENV === 'development') {
  import('./utils/debug');
}

// Ensure token migration happens at startup
tokenManager.migrateFromLegacyStorage();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
