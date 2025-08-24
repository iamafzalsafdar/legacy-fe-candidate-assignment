import React from 'react';
import ReactDOM from 'react-dom/client';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import App from './App';

const DYNAMIC_ENV_ID = import.meta.env.VITE_DYNAMIC_ENV_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: DYNAMIC_ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <div style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        <DynamicWidget />
      </div>
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);
