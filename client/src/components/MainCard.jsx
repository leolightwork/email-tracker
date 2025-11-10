import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import MainCardHeader from './MainCardHeader';
import '../styles/main-card.css';

const MainCard = () => {
  const form = useForm();

  return (
    <>
      <div className="maincard-wrapper">
        <div className="form-wrapper">
          <div className="maincard-header-wrapper">
            <h2>Email Submission Form</h2>
            <MainCardHeader />
          </div>

          <form>
          </form>
        </div>
      </div>
    </>
  );
};

export default MainCard;
