import '../styles/main-card.css';
import React from 'react';

const ToggleBar = ({ setView }) => {
  return (
    <>
      <div className="card-header">
        <button onClick={() => setView('create')}>Create</button>
        <button onClick={() => setView('list')}>Email List</button>
      </div>
    </>
  );
};

export default ToggleBar;
