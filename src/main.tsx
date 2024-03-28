import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStylesProvider from './provider/GlobalStylesProvider/index.tsx';
import AppProvider from './provider/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStylesProvider>
        <App />
      </GlobalStylesProvider>
    </AppProvider>
  </React.StrictMode>,
);
