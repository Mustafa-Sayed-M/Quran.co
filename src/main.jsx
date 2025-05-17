import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Font Awesome:
import "@fortawesome/fontawesome-free/css/all.min.css";

// React Router DOM:
import { BrowserRouter } from 'react-router-dom';

// Tanstack (React Query):
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingsContextProvider } from './Context/SettingsContext.jsx';
// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Browser Router */}
    <BrowserRouter>
      {/* Query Provider */}
      <QueryClientProvider client={queryClient}>
        {/* Contexts Providers */}
        <SettingsContextProvider>
          <App />
        </SettingsContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
