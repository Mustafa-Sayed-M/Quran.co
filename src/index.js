import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React Router:
import { BrowserRouter } from 'react-router-dom';

// Font Awesome:
import "@fortawesome/fontawesome-free/css/all.min.css";

// AOS:
import 'aos/dist/aos.css';

// React Query / Tanstack:
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Create a client
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();