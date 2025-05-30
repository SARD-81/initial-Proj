import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CustomChakraProvider from './CustomChakraProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomChakraProvider>
      <App />
    </CustomChakraProvider>
  </React.StrictMode>
);