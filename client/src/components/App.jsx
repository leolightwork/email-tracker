import { useState } from 'react';
import MainCard from './MainCard.jsx';
import EmailList from './EmailList.jsx';
import '../styles/header.css';

const App = () => {
  const [view, setView] = useState('create');
  return (
    <>
      <div className="nav-wrapper">
        <h1>Email Submission Interface</h1>
      </div>

      {view === 'create' ? (
        <MainCard view={view} setView={setView} />
      ) : (
        <EmailList view={view} setView={setView} />
      )}
    </>
  );
};

export default App;
