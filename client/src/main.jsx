import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import {
  ApolloProvider
} from '@apollo/client';
import {client} from './ApolloClient.jsx';

createRoot(document.getElementById('root')).render(

    <ApolloProvider client={client}>
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    </ApolloProvider>
)
