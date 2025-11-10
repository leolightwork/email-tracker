import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import { IoAddSharp } from 'react-icons/io5';
import '../styles/header.css';
import { useState } from 'react';

const Header = () => {
  const [rotateSVG, setRotateSVG] = useState(false);
  const handleClick = () => {
    setRotateSVG(!rotateSVG);
  };

  return (
    <>
      <nav className="nav-wrapper">
      <h1>Email Submission Interface</h1>
        <IoAddSharp
          className={`base ${rotateSVG ? `rotate` : ''}`}
          onClick={handleClick}
        />
      </nav>
    </>
  );
};

export default Header;
