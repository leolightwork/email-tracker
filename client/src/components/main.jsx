import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainCard from './MainCard.jsx';
import '../styles/global.css';
import '../styles/header.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <div className="nav-wrapper">
      <h1>Email Submission Interface</h1>
    </div>

    <MainCard />
  </StrictMode>
);
