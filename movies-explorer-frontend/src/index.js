import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { UserInfoStoreProvider } from './UserInfoStoreContext';
import './vendor/normalize.css';
import './vendor/fonts/inter_Web/inter.css';
import './vendor/fonts/suisse_intl/suisse.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserInfoStoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserInfoStoreProvider>
);
