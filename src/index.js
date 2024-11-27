import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl='https://azure-major-cuckoo-428.mypinata.cloud/ipfs/QmNLorS3SzrjCoxi2mLwqpXLxUityDX76tySpwrdcUDEWK'>
        <App />
      </TonConnectUIProvider>
    </Provider>
  </BrowserRouter>
)
