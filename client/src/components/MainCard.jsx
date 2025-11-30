import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/main-card.css';
import ToggleBar from './ToggleBar';

const MainCard = ({ setView }) => {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [interval, setInterval] = useState(0);

  return (
    <>
      <div className="body-wrapper">
        {/* <div className="card-wraper"> */}

        <ToggleBar setView={setView} />
        <div className="form-wrapper">
          <div className="banner-create">
            <h3>Create</h3>
          </div>
          <div className="main-form">
            <form onSubmit={handleSubmit}>
              <div className="label-flex">
                <label htmlFor="email">Email:</label>
                <input {...register('email')} />
              </div>

              <div className="label-flex">
                <label htmlFor="course">Course:</label>
                <input {...register('course')} />
              </div>

              <h4>Schedule / Interval </h4>
              <div className="label-flex">
                <label htmlFor="date">Date To Send:</label>
                <input {...register('date')} />
              </div>
              <div className="label-flex">
                <label htmlFor="interval">
                  Days Of Each Recurring Submission:
                </label>
                <input {...register('interval')} />
              </div>
              <button type="submit" className="form-button">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default MainCard;
