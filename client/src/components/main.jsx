import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header.jsx';
import MainCard from './MainCard.jsx';
import '../styles/global.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <MainCard />
    
  </StrictMode>
);
